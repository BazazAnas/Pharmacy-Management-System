import express from "express";
import session from "express-session";
import pg from "pg";
import cors from "cors";
import env from "dotenv";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";

const app = express();
const port = 3500;
const saltRounds = 10;

env.config();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({origin:"http://localhost:5173" , credentials: true}))
app.use(session(
    {
        secret: process.env.SESSION_SECRET,
        resave:false,
        saveUninitialized:false,
        cookie: {
            secure:false,
            maxAge: 1000 * 60 * 60 * 24
        }
    }
))

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
})
 
db.connect()
  .then(()=>{console.log("connected")})

app.post("/create", async (req,res) => {
    console.log("requested to create");
    const {username,password} = req.body;
    try {
        const result = await db.query("SELECT * FROM users WHERE username = $1",[username]);
        if (result.rows.length > 0) {
            res.json({ found : true});
        } else {
            bcrypt.hash(password,saltRounds,(err,hash) => {
                if (err) {
                    console.log("Error while hashing password:", err);
                } else {
                    db.query("INSERT INTO users (username, password) VALUES ($1, $2)",
                    [username, hash]
                    );
                    res.status(200).json({message: "user created successfully"});
                }
            });
        }
    } catch (error) {
        console.log(error);
    }
})

app.post("/login",async (req,res)=>{
   console.log("requested to login") 
   const {username,password} = req.body;
   try {
        const userCheck = await db.query("SELECT * FROM users WHERE username = $1" ,[username])
        if (userCheck.rows.length === 0) { return res.status(401).json({error : "Invalid Cridentails"})}
        const user = userCheck.rows[0];
        const validPassword = await bcrypt.compare(password,user.password)
        if(!validPassword){ return res.status(401).json({error: "Invalid Password"})}
        req.session.userId = user.id;
        res.status(200).json( {message: 'Successful request' })
        console.log("logged in")
   } catch (error) {
        res.status(500).json({ error: 'Wrong Password' });
   }
})

const requireAuth = (req, res, next) => {
    if (!req.session.userId) return res.status(401).json({ error: 'Unauthorized' });
    next();
};


app.get("/drugs", requireAuth , async (req,res)=>{
    try {
        const resultDrugs = await db.query("SELECT * FROM  drugs WHERE user_id = $1",[req.session.userId]); 
        res.json(resultDrugs.rows);
    } catch (error) {
        res.status(500).json({error:"Server error"})
    }
});

app.post("/drugs", requireAuth , async (req,res)=>{
  console.log("drug add requested");
  console.log("Drug add requested with data:", req.body);
  console.log("User ID from session:", req.session.userId);
  const {name,quantity,price} = req.body;
  try {
    const result = await db.query("INSERT INTO drugs (name,quantity,price,user_id) VALUES ($1,$2,$3,$4) RETURNING *",
        [name,quantity,price,req.session.userId]
    );
    console.log("drug added")
    console.log(result.rows[0])
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Database error details:", error.message);
    console.error("Error code:", error.code);
    console.error("Error detail:", error.detail);
    res.status(500).json({error: "server error"});
  }
});

app.post("/bills", requireAuth ,async (req,res) =>{
    try {
        const {items} = req.body;
        let total = 0;
        for (const item of items) {
            const drug = await db.query(
              'SELECT price, quantity FROM drugs WHERE id = $1 AND user_id = $2',
              [item.drug_id, req.session.userId]
            )
            if (drug.rows[0].quantity < item.quantity) throw new Error('Insufficient quantity');
             total += drug.rows[0].price * item.quantity;
            };  
         
        const billResult = await db.query(
        'INSERT INTO bills (user_id, total) VALUES ($1, $2) RETURNING id',
        [req.session.userId, total]
        );
        const billId = billResult.rows[0].id;    

        for (const item of items) {
        await db.query(
            "INSERT INTO bill_items (bill_id, drug_id, quantity) VALUES ($1, $2, $3)",
            [billId, item.drug_id, item.quantity]
        )
        await db.query(
            'UPDATE drugs SET quantity = quantity - $1 WHERE id = $2',
            [item.quantity, item.drug_id]
        );
        }
        res.json({ message: 'Bill created successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post('/logout', (req, res) => {
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out' });
  });

app.listen({port},()=>{
    console.log(`server running on ${port}`);
})