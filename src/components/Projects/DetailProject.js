import { faCalendar, faClock } from "@fortawesome/free-regular-svg-icons";
import {
  faLocationCrosshairs,
  faPiggyBank,
  faThumbTack,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MyUserContext } from "App";
import ImagePost from "components/Posts/ImagePost";
import apiConfig, { endpoints } from "config/apiConfig";
import { formatCurrency, formatDate } from "functions";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import DeleteProject from "./DeleteProject";
import CreateAndUpdateProject from "./CreateAndUpdateProject";

function DetailProject() {
  const { projectId } = useParams();
  const [project, setProject] = useState({
    id: "",
    nameProject: "",
    purpose: "",
    address: "",
    startTime: "",
    endTime: "",
    amountRaised: "",
    user: {},
    images: [],
    createAt: "",
    updateAt: "",
  });
  const [user, dispatch] = useContext(MyUserContext);
  const navigate = useNavigate();
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => {
    setShowDelete(false);
  };

  const handleShowDelete = () => {
    setShowDelete(true);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = async (id) => {
    setShow(true);
  };

  useEffect(() => {
    const handleShowPost = async () => {
      try {
        const response = await apiConfig.get(
          `${endpoints["project"]}${projectId}/`
        );
        const data = response.data;
        setProject({
          id: data.id,
          nameProject: data.nameProject,
          purpose: data.purpose,
          address: data.address,
          startTime: data.startTime,
          endTime: data.endTime,
          amountRaised: data.amountRaised,
          user: data.user,
          images: data.images,
          createAt: data.createAt,
          updateAt: data.updateAt,
        });
        if (response.status === 200) {
          console.log("getPostById oke");
        } else {
          console.log("error");
        }
      } catch (ex) {
        console.log(ex);
      }
    };

    handleShowPost();
  }, []);
  return (
    <>
      <div className="relative">
        {user !== null && user.username === project.user.username ? (
          <div className="ml-auto flex absolute top-0 right-0">
            <span className="mr-[8px] inline-block p-[12px] text-white font-bold cursor-pointer rounded-[12px] bg-color-btn-info"
            onClick={handleShow}>
              Sửa
            </span>
            <CreateAndUpdateProject 
              showPopup={show}
              closePopup={handleClose}
              project={project}
            />
            <span
              className="mr-[8px] inline-block p-[12px] text-white font-bold cursor-pointer rounded-[12px] bg-color-btn-danger"
              onClick={handleShowDelete}>
              Xóa
            </span>
            <DeleteProject 
              showPopup={showDelete}
              closePopup={handleCloseDelete}
              project={project.id}
            />
          </div>
        ) : <></>}

        <h2 className="font-['Calistoga'] text-[40px] mb-[20px]">
          {project.nameProject}
        </h2>
        <h3 className="mb-[12px]">
          <FontAwesomeIcon icon={faCalendar} className="mr-[8px] w-[30px]" />
          {formatDate(project.createAt)}
        </h3>
        <hr className="mb-[12px]" />
        <div className="my-[20px]">
          <ImagePost listImage={project.images} />
        </div>
        <h3 className="mb-[20px]">
          <FontAwesomeIcon icon={faThumbTack} className="mr-[8px] w-[30px]" />
          {project.purpose}
        </h3>
        <h3 className="mb-[20px]">
          <FontAwesomeIcon
            icon={faLocationCrosshairs}
            className="mr-[8px] w-[30px]"
          />
          {project.address}
        </h3>
        <h3 className="mb-[20px]">
          <FontAwesomeIcon icon={faClock} className="mr-[8px] w-[30px]" />
          {project.startTime ? project.startTime : "Chưa cập nhật"}
        </h3>
        <h3 className="mb-[20px]">
          <FontAwesomeIcon icon={faClock} className="mr-[8px] w-[30px]" />
          {project.endTime ? project.endTime : "Chưa cập nhật"}
        </h3>
        <h3 className="mb-[20px]">
          <FontAwesomeIcon icon={faPiggyBank} className="mr-[8px] w-[30px]" />
          {formatCurrency(project.amountRaised)}
        </h3>
      </div>
      <div>
        <h2 className="font-['Calistoga'] text-[25px] mb-[20px]">
          danh sach nguoi tham gia
        </h2>

        <ul>
          <li>
            <div className="flex items-center">
              <img src={project.user.avatar} alt="" width={100} height={100} />
              <div className="flex flex-column ml-[12px]">
                <span>Ten</span>
                <span>vaiTro</span>
                <span>So tien dong gop</span>
                <span>Các đóng góp khác</span>
              </div>
              <div className="ml-auto flex flex-column">
                <span className="mb-[8px] inline-block p-[12px] text-white font-bold cursor-pointer rounded-[12px] bg-color-btn-info">
                  Sửa
                </span>
                <span className="mb-[8px] inline-block p-[12px] text-white font-bold cursor-pointer rounded-[12px] bg-color-btn-danger">
                  Xóa
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="mt-[12px]">
        <h3 className="my-[8px] font-['Calistoga'] text-color-btn-main">
          Hãy gửi bình luận của bạn về dự án này
        </h3>
        <form method="post">
          <Form.Control
            type="text"
            name="content"
            placeholder="Nhập bình luận..."
          />
          <input
            type="submit"
            className="bg-color-btn-info px-[12px] py-[8px] mt-[12px] font-bold rounded-[12px]"
            value={"Gửi"}
          />
        </form>
      </div>
      <div className="mt-[12px]">
        <h2 className="font-['Calistoga'] text-[25px] mb-[20px]">
          danh sach binh luan
        </h2>
        <ul>
          <li>
            <div className="flex items-center">
              <img src={project.user.avatar} alt="" width={100} height={100} />
              <div className="flex flex-column ml-[12px]">
                <span>Ten</span>
                <span>vaiTro</span>
                <span>So tien dong gop</span>
                <span>Các đóng góp khác</span>
              </div>
              <div className="ml-auto flex flex-column">
                <span className="mb-[8px] inline-block p-[12px] text-white font-bold cursor-pointer rounded-[12px] bg-color-btn-info">
                  Sửa
                </span>
                <span className="mb-[8px] inline-block p-[12px] text-white font-bold cursor-pointer rounded-[12px] bg-color-btn-danger">
                  Xóa
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

export default DetailProject;
