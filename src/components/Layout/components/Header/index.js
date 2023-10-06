import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Col, Container, Nav, Navbar, NavDropdown, Row } from "react-bootstrap"; // Import components from react-bootstrap
import Image from "react-bootstrap/Image";
import { MyUserContext } from "../../../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { logofooter } from "assets/img";
function Header() {
  const [user, dispatch] = useContext(MyUserContext);
  const handleLogout = () => {
    dispatch({
      type: "logout",
    });
  };
  return (
    <section className="seaction-header">
      <Container>
        <Row>
          <Col>
            <div className="flex items-center justify-between py-[11px] text-text-color-menu">
              <div className="flex items-center">
                <img src={logofooter} alt="" width={50} height={50} />
                <Link
                  to={"/"}
                  className="text_logo text-[14px] text-center ml-[8px] font-bold">
                  WEBSITE HỖ TRỢ TỪ THIỆN <br /> TRƯỜNG ĐẠI HỌC MỞ TPHCM
                </Link>
              </div>
              <div className="self-stretch d-none d-lg-block">
                <ul className="flex menu-header h-full">
                  <li className="item-menu-header ml-[13px]">
                    <NavLink
                      to={"/"}
                      className="item-link-header flex items-center">
                      TRANG CHỦ
                    </NavLink>
                  </li>
                  <li className="item-menu-header ml-[13px]">
                    <NavLink
                      to={"/about"}
                      className="item-link-header flex items-center">
                      GIỚI THIỆU
                    </NavLink>
                  </li>
                  <li className="item-menu-header ml-[13px]">
                    <NavLink
                      to={"/post-auction"}
                      className="item-link-header flex items-center">
                      BÀI VIẾT
                    </NavLink>
                  </li>
                  <li className="item-menu-header ml-[13px]">
                    <NavLink
                      to={"/project-auction"}
                      className="item-link-header flex items-center">
                      DỰ ÁN
                    </NavLink>
                  </li>
                  <li className="item-menu-header ml-[13px]">
                    <NavLink
                      to={"/contact"}
                      className="item-link-header flex items-center">
                      LIÊN HỆ
                    </NavLink>
                  </li>
                  {user !== null ? (
                    <>
                      {" "}
                      <li className="item-menu-header ml-[13px] flex items-center ">
                        <NavLink
                          to={`/profile?iduser=${
                            user ? user.maThanhVien : null
                          }`}
                          className="btn-login flex items-center gap-[4px]">
                          <Image
                            className="mr-2"
                            width="30"
                            height="30"
                            roundedCircle
                            src={user.anhDaiDien}
                          />
                          Xin chào {user.username}
                        </NavLink>
                      </li>
                      <li className="item-menu-header ml-[13px] flex items-center ">
                        <Button
                          onClick={handleLogout}
                          className="btn-login flex items-center gap-[4px] cursor-pointer bg-color-btn-danger"
                          variant="danger">
                            
                          <FontAwesomeIcon icon={faRightFromBracket} />
                          ĐĂNG XUẤT
                        </Button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="item-menu-header ml-[13px] flex items-center ">
                        <NavLink
                          to={"/login"}
                          className="btn-login flex items-center gap-[4px]">
                          <FontAwesomeIcon icon={faUser} />
                          ĐĂNG NHẬP
                        </NavLink>
                      </li>
                      <li className="item-menu-header ml-[13px] flex items-center ">
                        <NavLink
                          to={"/register"}
                          className="btn-login flex items-center gap-[4px]">
                          <FontAwesomeIcon icon={faUser} />
                          ĐĂNG KÝ
                        </NavLink>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Header;
