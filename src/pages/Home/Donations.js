import { check_icon, heart_icon, img_donate } from "assets/img";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Donations() {
  return (<section className="donations bg-bg-color-content">
    <Container>
      <Row>
        <Col lg={6}>
          <div className="bg-bg-color-content">
          </div>
        </Col>
        <Col lg={6}>
          <div className="bg-bg-color-donate relative pb-[85px] pt-[20px] pr-[49px]
          flex items-end flex-column">
            <div className="list-img-donate flex flex-column items-start absolute left-0  top-[50%] translate-x-[-50%] translate-y-[-50%]">
              <img src={img_donate} alt="" className="mb-[12px]"/>
              <img src={img_donate} alt=""className="mb-[12px]"/>
              <img src={img_donate} alt=""className=""/>
            </div>

            <h2 className="text-white text-[45px] font-['Calistoga'] mt-[36px] mb-[16px] text-right">Quyên góp</h2>
            <span className="text-[24px] text-white text-right">ABC</span>
            <ul className="mr-[200px] my-[100px]">
              <li className="flex items-center">
                <img src={check_icon} alt=""/>
                <span className="text-[24px] ml-[21px] text-white">ABC</span>
              </li>
              <li className="flex items-center">
                <img src={check_icon} alt=""/>
                <span className="text-[24px] ml-[21px] text-white">ABC</span>
              </li>
            </ul>
            <Link className="inline-flex items-center text-white bg-btn-color text-[15px] py-[14px] px-[30px] leading-none">HƯỚNG DẪN QUYÊN GÓP <img className="ml-[4px]" src={heart_icon} alt=""/></Link>
          </div>
        </Col>
      </Row>
    </Container>
  </section>  );
}

export default Donations;