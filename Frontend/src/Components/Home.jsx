import CustomNavbar from "./CustomNavbar";
import "./../styles/home.css";

function Home() {
    return (
        <>
            <CustomNavbar />

            <div className="content">

                {/* ── LEFT: Brand identity panel ── */}
                <div className="left">
                    <div className="left_inner">
                        <div className="pms_acronym">PMS</div>
                        <p className="pms_full_name">Pharmacy Management System</p>
                        <p className="pms_tagline">
                            Precision-built for the <em>modern pharmacy</em>.
                            Inventory, billing & prescriptions — unified.
                        </p>
                        <div className="accent_bar" />
                        <div className="feature_pills">
                            <span className="pill">Inventory</span>
                            <span className="pill">Billing</span>
                            <span className="pill">Prescriptions</span>
                            <span className="pill">Analytics</span>
                        </div>
                    </div>
                </div>

                {/* ── RIGHT: Description panel ── */}
                <div className="right">
                    <div className="right_inner">
                        <p className="right_eyebrow">About the Platform</p>
                        <h2 className="right_heading">
                            The complete system<br />
                            for your <span>pharmacy</span>.
                        </h2>

                        <p className="right_body">
                            A Pharmacy Management System (<strong>PMS</strong>) is a software
                            solution designed to streamline and automate various operations
                            within a pharmacy. It helps in managing inventory, prescription
                            processing, billing, and maintaining customer records.
                        </p>

                        <p className="right_body" style={{ marginTop: '16px' }}>
                            The system enables pharmacists to efficiently track and manage
                            stock levels, handle prescription orders, and manage medication
                            dispensing — while ensuring <strong>accuracy</strong> in delivering
                            the right medication, every time.
                        </p>

                        <div className="right_divider" />

                        <div className="stats_strip">
                            <div className="stat_item">
                                <div className="stat_num">99<span>%</span></div>
                                <div className="stat_desc">Accuracy</div>
                            </div>
                            <div className="stat_item">
                                <div className="stat_num">24<span>/7</span></div>
                                <div className="stat_desc">Availability</div>
                            </div>
                            <div className="stat_item">
                                <div className="stat_num">0<span>s</span></div>
                                <div className="stat_desc">Downtime Goal</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Home;