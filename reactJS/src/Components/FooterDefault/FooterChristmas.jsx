import React, { useRef } from "react";
import "./FooterDefault.css";
import logo from "../Images/logoChristmas.png";
import fb from "../Images/icon/fb.png";
import ins from "../Images/icon/ins.png";
import yt from "../Images/icon/yt.png";
import tiktok from "../Images/icon/tiktok.png";
import { NavLink as Link } from "react-router-dom";
import emailjs from '@emailjs/browser';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const MessengerComponent = React.lazy(() =>
    import("../MessengerComponent/MessengerComponent")
);

function FooterChristmas() {
    const form = useRef();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const sendEmail = (e) => {
        e.preventDefault();
        if (form.current) {
            emailjs.sendForm('service_h5odl76', 'template_4054kz9', form.current, 'YGqcQbP5kiXMLa0Qv')
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                });
            e.target.reset();
        }

    };

    return (
        <div className="footer"  >
            <div className="christmas footer_infor">
                <div className="footer__infor-introduce">
                    <div className="footer__infor-introduce-name name">Về chúng tôi </div>
                    <div className="footer__infor-introduce-infor infor">HKLFashion&reg;
                        là trang mua sắm của thương hiệu HKLFashion&reg;,
                        chuyên các sản phẩm thời trang đẹp, thời thượng
                        giúp bạn tận hưởng cuộc sống thường nhật!</div>
                </div>

                <div className="footer__infor-link">
                    <div className="footer__infor-introduce-name name">Liên kết</div>
                    <div className="footer__infor-introduce-infor infor">
                        HKLFashion&reg; /SỰ KHỞI ĐẦU/<br />
                        Chính sách bảo hành<br />
                        Phương thức thanh toán<br />
                        <a href="https://tinhte.vn/" style={{ color: 'white' }} target="_blank" rel="noreferrer">Tinhte.vn</a>
                        <a href="https://kenh14.vn/" style={{ color: 'white' }} target="_blank" rel="noreferrer">Kenh14.vn</a>
                    </div>
                </div>

                <div className="footer__infor-contact">
                    <div className="footer__infor-introduce-name name">Thông tin liên hệ</div>
                    <div className="footer__infor-introduce-infor infor">
                        Trường Đại học Công nghệ Thông tin- ĐHQG TPHCM<br />
                        <b style={{ fontWeight: 500 }}>Số điện thoại:</b> 0987654321<br />
                        <b style={{ fontWeight: 500 }}>Email:</b> hkl.fashion@gmail.com
                    </div>
                </div>

                <div className="footer__infor-logo">
                    <div className="logo-footer">
                        <Link to="/">
                            <img src={logo} alt="logo" />
                            {/* <h2>&nbsp;HKLFashion</h2> */}
                        </Link>
                    </div>
                    <div className="name">Đăng ký nhận tin</div>
                    <form ref={form} onSubmit={sendEmail}>
                        <input type="Email" placeholder="Nhập email" name="user_email" />
                        <input type="Submit" value="Đăng ký"></input>
                    </form>
                    <div className="social-icon">
                        <a href="https://www.facebook.com/noithatfudo"> <FacebookRoundedIcon fontSize="large" style={{ color: 'white' }} /> </a>
                        <a href="https://www.facebook.com/noithatfudo"><YouTubeIcon fontSize="large" style={{ color: 'white' }} /></a>
                        <a href="https://www.facebook.com/noithatfudo"><InstagramIcon fontSize="large" style={{ color: 'white' }} /></a>
                        <a href="https://www.facebook.com/noithatfudo"><LinkedInIcon fontSize="large" style={{ color: 'white' }} /></a>
                    </div>
                </div>
            </div>
            <div className="christmas footer-infor-mobile " style={{padding:'5px 10px'}} >

                <Accordion sx={{boxShadow:'0px 0px 2px white'}} style={{ backgroundColor: 'transparent' }} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary sx={{boxShadow:'0px 0px 2px white'}}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ color: '#f8f9fa', width: '100%', fontSize: '18px', flexShrink: 0, fontWeight: '600' }}>
                            Về chúng tôi
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography sx={{ color: '#f8f9fa' }}>
                            HKLFashion&reg;
                            là trang mua sắm của thương hiệu HKLFashion&reg;,
                            chuyên các sản phẩm thời trang đẹp, thời thượng
                            giúp bạn tận hưởng cuộc sống thường nhật!
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion  sx={{boxShadow:'0px 0px 2px white'}} style={{ backgroundColor: 'transparent' }} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary sx={{boxShadow:'0px 0px 2px white'}}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ color: '#f8f9fa', width: '100%', fontSize: '18px', flexShrink: 0, fontWeight: '600' }}>
                            Liên kết
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ color: '#f8f9fa', width: '100%', display: 'flex', margin: '0 auto', justifyContent: 'center' }}>
                        <div style={{ marginLeft: '-6px', marginBottom: '0' }} className="footer__infor-link">
                            <div className="footer__infor-introduce-infor infor">
                                HKLFashion&reg; /SỰ KHỞI ĐẦU/<br />
                                Chính sách bảo hành<br />
                                Phương thức thanh toán<br />
                                <a href="https://tinhte.vn/" style={{ color: '#f8f9fa' }} target="_blank" rel="noreferrer">Tinhte.vn</a>
                                <br />
                                <a href="https://kenh14.vn/" style={{ color: '#f8f9fa' }} target="_blank" rel="noreferrer">Kenh14.vn</a>
                            </div>
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion sx={{boxShadow:'0px 0px 2px white'}}style={{ color: '#f8f9fa', backgroundColor: 'transparent' }} expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary sx={{boxShadow:'0px 0px 2px white'}}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ width: '100%', fontSize: '18px', flexShrink: 0, fontWeight: '600' }}>
                            Thông tin liên hệ
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Trường Đại học Công nghệ Thông tin- ĐHQG TPHCM<br />
                            <b style={{ fontWeight: 500 }}>Số điện thoại: </b>0799684120<br />
                            <b style={{ fontWeight: 500 }}>Email: </b>hkl.fashion@gmail.com
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion sx={{boxShadow:'0px 0px 2px white'}} style={{ color: '#f8f9fa', backgroundColor: 'transparent' }} expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                    <AccordionSummary sx={{boxShadow:'0px 0px 2px white'}}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"

                        id="panel1bh-header"
                    >
                        <Typography sx={{ width: '100%', fontSize: '18px', flexShrink: 0, fontWeight: '600' }}>
                            Đăng kí nhận tin
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ width: '50%', display: 'flex', margin: '0 auto', justifyContent: 'center' }}>
                        <div className="footer__infor-logo">
                            <div className="logo-footer" style={{ display: 'flex', justifyContent: 'center', margin: '0' }}>
                                <Link to="/">
                                    <img src={logo} alt="logo" />
                                </Link>
                            </div>
                            <form ref={form} onSubmit={sendEmail}>
                                <input
                                    type="Email"
                                    placeholder="Nhập email"
                                    name="user_email"
                                />
                                <input type="Submit" value="Đăng ký"></input>
                            </form>
                            <div className="social-icon">
                                <a href="https://www.facebook.com/noithatfudo"> <FacebookRoundedIcon fontSize="large" style={{ color: 'white' }} /> </a>
                                <a href="https://www.facebook.com/noithatfudo"><YouTubeIcon fontSize="large" style={{ color: 'white' }} /></a>
                                <a href="https://www.facebook.com/noithatfudo"><InstagramIcon fontSize="large" style={{ color: 'white' }} /></a>
                                <a href="https://www.facebook.com/noithatfudo"><LinkedInIcon fontSize="large" style={{ color: 'white' }} /></a>
                            </div>
                        </div>
                    </AccordionDetails>
                </Accordion>


            </div>
            <div className="footer_copyright">
                <p>Copyright &copy; 2023 HKLFashion&reg;. Powered by HKL Fashion</p>
            </div>
            {/* <MessengerComponent/> */}
        </div>


    );
}

export default FooterChristmas;
