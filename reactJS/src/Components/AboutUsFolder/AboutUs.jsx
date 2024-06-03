import React from "react";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import "./AboutUs.css";
import about1 from "../Images/about/about1.jpg";
import about2 from "../Images/about/about2.jpg";
import about3 from "../Images/about/about3.png";
const MessengerComponent = React.lazy(() =>
    import("../MessengerComponent/MessengerComponent")
);

function About() {
  return (
      <div className="aboutus-container">
          <Breadcrumb>
              <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
              <Breadcrumb.Item active>Giới thiệu</Breadcrumb.Item>
          </Breadcrumb>
          <div className="about-content">
              <div className="header-about-content">
                  <h2>Giới thiệu</h2>
                  <h1>HKL Fashion® - Popular Streetwear brand</h1>
                  <h3>
                      Chúng tôi là thương hiệu thời trang Đường phố nổi tiếng
                      với định hướng <br></br>
                      cung cấp sản phẩm có chất lượng cao, sành điệu với giá
                      thành hợp lý.
                  </h3>
              </div>
              <div className="main-about-content">
                  <img src={about1} alt="about 1" />
                  <h1>Chúng tôi là ai?</h1>
                  <p>
                      HKL Fashion® là lựa chọn hàng đầu dành cho các tín đồ thời
                      trang Đường phố sành điệu. Sứ mệnh của HKL Fashion® là
                      trao quyền cho thế hệ trẻ toàn thế giới tự do thể hiện
                      phong cách thông qua thời trang, thương hiệu vượt qua ranh
                      giới của thời trang đường phố bằng cách không ngừng sáng
                      tạo các trang phục với các bộ sưu tập độc đáo.
                  </p>
                  <img src={about2} alt=" about2" />
                  <h1>Chất lượng trải nghiệm vượt trội</h1>
                  <p>
                      Chúng tôi không ngừng nỗ lực, tập trung vào chất lượng sản
                      phẩm và trải nghiệm mua sắm vượt trội nhất chưa từng có
                      trước đây, các cửa hàng vật lý của chúng tôi, tối ưu hóa
                      trải nghiệm, giúp người dùng mua sắm một sản phẩm cao cấp
                      thật sự. Mua sắm trực tuyến dễ dàng, đa nền tảng trải
                      nghiệm tuyệt vời. Giá thành hợp lý. Điều này đã giải quyết
                      bài toán để bạn vừa cân đối khả năng tài chính, vừa đáp
                      ứng hoàn hảo cho nhu cầu thời trang của bạn và xu hướng
                      nhanh của thời đại.
                  </p>
                  <img src={about3} alt="about3" />
                  <h1>Biểu tượng thời trang thời đại mới</h1>
                  <p>
                      Tại HKL Fashion®, mỗi sản phẩm đều mang theo sự cá tính và
                      sành điệu, đại diện cho hình ảnh giới trẻ hiện đại - biểu
                      tượng cho sự dẫn đầu phong cách thời đại mới.
                  </p>
                  <p>
                      Quần áo có thể sẽ lỗi thời nhưng phong cách thời trang thì
                      không. Tầm nhìn độc đáo của HKL Fashion® chính là để mỗi
                      cá nhân tự do thể hiện phong cách khi khoác lên mình những
                      sản phẩm được tạo nên từ sự đam mê, mang giá trị của thế
                      hệ mới, đầy trẻ trung, năng động và luôn không ngừng khẳng
                      định bản thân, hướng đến tương lai.
                  </p>
                  <p>
                      Sự đầu tư từ chất lượng đóng gói, bao bì sản phẩm đến mỗi
                      thước phim, hình ảnh cho tới cách làm chủ được nghệ thuật
                      sắc màu và chỉn chu trong từng chi tiết đã đưa HKL
                      Fashion® trở thành một trong những thương hiệu thời trang
                      Đường phố được giới trẻ yêu thích, tin dùng hàng đầu tại
                      Việt Nam.
                  </p>
                  <div className="contact">
                      <div className="contact_info">
                          <div className="contact_address">
                              <h4>Thông tin liên hệ</h4>
                              <ul className="list_info">
                                  <li>
                                      <strong>
                                          Cửa Hàng Bán Quần Áo HKL Fashion
                                      </strong>
                                  </li>
                                  <li>
                                      <strong>Số điện thoại: </strong>0799684120
                                  </li>
                                  <li>
                                      <strong>Email: </strong>
                                      hkl.fashion23@gmail.com
                                  </li>
                                  <li>
                                      <strong>Địa chỉ: </strong>Trường Đại học
                                      Công nghệ Thông tin - ĐHQG TPHCM
                                  </li>
                              </ul>
                          </div>
                          <div className="contact_time">
                              <h4>Giờ làm việc</h4>
                              <ul className="list_info">
                                  <li>
                                      <strong>Văn phòng: </strong>Thứ 2 - Thứ 7;
                                      9:00 - 18:00
                                  </li>
                                  <li>
                                      <strong>Cửa hàng: </strong>Thứ 2 - Chủ
                                      Nhật; 9:00 - 21:00
                                  </li>
                              </ul>
                          </div>
                      </div>
                      <div className="map">
                          <iframe
                              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.2311711961765!2d106.80086541376906!3d10.870014160434073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527587e9ad5bf%3A0xafa66f9c8be3c91!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2jhu4cgVGjDtG5nIHRpbiAtIMSQSFFHIFRQLkhDTQ!5e0!3m2!1svi!2s!4v1679445251597!5m2!1svi!2s"
                              style={{ border: 0 }}
                              allowfullscreen=""
                              loading="lazy"
                          ></iframe>
                      </div>
                  </div>
              </div>
          </div>
          <MessengerComponent />
      </div>
  );
}

export default About;
