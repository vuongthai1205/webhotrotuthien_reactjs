
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { anh_bia_page } from "assets/img";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function HeaderPage({ title }) {
  return (
    <section
      className="header-page h-[450px]"
      style={{ backgroundImage: `url(${anh_bia_page})` }}>
        <Container className="h-full" >
          <Row className="h-full">
            <Col className="h-full relative">
              <div className="flex absolute left-[15px] bottom-[56px] right-[15px] justify-between">
                <h2 className="title-page-header font-['Calistoga'] text-[50px] text-white">
                  {title}
                </h2>
                <div className="flex items-end text-white">
                  <p>
                    <Link to={"/"} className="text-color-login-fail uppercase">TRANG CHỦ</Link>
                    <span className="mx-[7px]"><FontAwesomeIcon icon={faAnglesRight} /></span>
                    <span className="uppercase">{title}</span>
                  </p>
                  
                </div>
              </div>
            </Col>   
          </Row>
        </Container>
      </section>
  );
}

export default HeaderPage;
