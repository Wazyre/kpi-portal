import './Banner.css'
import thumbnail from '../assets/thumbnail.png'

const Banner = () => {
    return (
        <>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" />
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js" />
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" />

            <nav className="topnav navbar w-100 navbar-expand-sm" dir="rtl">
                <span className="span1"><img src={thumbnail} alt="Description"
                    width="350" height="150" style={{"marginRight": "20px", "backgroundColor":"white"}}/></span>
                <div className="navbar-toggler-container">
                    <button className="navbar-toggler ml-auto custom-toggler" type="button" data-toggle="collapse" data-target="#collapse_target" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div className="collapse navbar-collapse" id="collapse_target">
                    <ul className="navbar-nav mr-auto" dir="rtl">

                        <li className="nav-item">
                            <a className="nav-link" href="https://c3hch526.caspio.com/dp/185CC0000cce362c585a419fa0f6
        ">الصفحة الرئيسية</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="https://c3hch526.caspio.com/dp/185CC000636f2c261a55431fb8f1
        ">خطة مشروع الإدارة</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="https://c3hch526.caspio.com/dp/185CC000949449f3c0d34033bf35
        ">إدراج الأحداث الرئيسية</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="https://c3hch526.caspio.com/dp/185CC0004d1777c7764e48e78e43
        "> إدراج مؤشرات الأداء الرئيسية</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="https://c3hch526.caspio.com/dp/185CC0009bf8c2008211465195d2
        ">إدراج المستلمات</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="https://c3hch526.caspio.com/dp/185CC000ca90363e35744cd2874b
        ">أعضاء المشروع</a>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#0" id="navbardrop" data-toggle="dropdown">
                                تقارير
                            </a>
                            <div className="dropdown-menu">
                                <a className="dropdown-item" href="#0">تقارير</a>
                                <a className="dropdown-item" href="#0">تقارير</a>
                                <a className="dropdown-item" href="#0">تقارير</a>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#0" id="navbardrop" data-toggle="dropdown">
                                تقارير
                            </a>
                            <div className="dropdown-menu">
                                <a className="dropdown-item" href="#0">تقارير</a>
                                <a className="dropdown-item" href="#0">تقارير</a>
                                <a className="dropdown-item" href="#0">تقارير</a>
                                <a className="dropdown-item" href="#0">تقارير</a>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="https://c3hch526.caspio.com/folderlogout">تسجيل الخروج</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Banner;