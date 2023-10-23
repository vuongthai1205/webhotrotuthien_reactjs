import { faCalendar, faClock } from "@fortawesome/free-regular-svg-icons";
import {
  faAngleDown,
  faAngleRight,
  faLocationCrosshairs,
  faPiggyBank,
  faThumbTack,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MyUserContext } from "App";
import ImagePost from "components/Posts/ImagePost";
import apiConfig, { authApi, endpoints } from "config/apiConfig";
import { formatCurrency, formatDate } from "functions";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeleteProject from "./DeleteProject";
import CreateAndUpdateProject from "./CreateAndUpdateProject";
import RegisterProject from "./RegisterProject";
import { lazy } from "react";
import { Suspense } from "react";

const ListJoinProject = lazy(() => import("./ListJoinProject"));
const EditCommentProject = lazy(() => import("./EditCommentProject"));
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
    listComment: [],
    user: {},
    images: [],
    createAt: "",
    updateAt: "",
  });
  const [user, dispatch] = useContext(MyUserContext);
  const navigate = useNavigate();
  const [showListJoinProject, setShowListJoinProject] = useState(false);
  const [isRegisterProject, setIsRegisterProject] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [count, setCount] = useState(0);
  const [formComment, setFormComment] = useState({
    content: "",
  });

  const handleCloseDelete = () => {
    setShowDelete(false);
  };

  const handleShowDelete = () => {
    setShowDelete(true);
  };

  const [showRegisterProject, setShowRegisterProject] = useState(false);
  const handleCloseRegisterProject = () => {
    setShowRegisterProject(false);
  };

  const handleShowRegisterProject = () => {
    setShowRegisterProject(true);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = async (id) => {
    setShow(true);
  };

  const [showEditCmt, setShowEditCmt] = useState({});
  const handleCloseEditCmt = (index) => {
    // Đóng popup chỉ cho mục có index tương ứng
    setShowEditCmt({ ...showEditCmt, [index]: false });
  };
  const handleShowEditCmt = (index) => {
    // Hiển thị popup chỉ cho mục có index tương ứng
    setShowEditCmt({ ...showEditCmt, [index]: true });
  };

  const handleContentChange = (e) => {
    const { name, value } = e.target;
    setFormComment((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const handleShowPost = async () => {
      try {
        const response = await apiConfig.get(
          `${endpoints["project"]}${projectId}/`
        );
        const data = response.data;

        if (response.status === 200) {
          setProject({
            id: data.id,
            nameProject: data.nameProject,
            purpose: data.purpose,
            address: data.address,
            startTime: data.startTime,
            endTime: data.endTime,
            amountRaised: data.amountRaised,
            listComment: data.listComment,
            user: data.user,
            images: data.images,
            createAt: data.createAt,
            updateAt: data.updateAt,
          });
        } else {
          console.log("error");
        }
      } catch (ex) {
        console.log(ex);
      }
    };

    handleShowPost();
  }, [count]);
  const handleDeleteComment = async (id) => {
    try {
      const response = await authApi().delete(
        `${endpoints["commentProject"]}${id}/`
      );
      if (response.status === 200) {
        handleProjectUpdate();
      } else {
        console.log("lỗi rồi ");
      }
    } catch (ex) {
      alert(ex);
    }
  };
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
    } else {
      try {
        const response = await authApi().post(
          `${endpoints["commentProject"]}${project.id}/`,
          formComment
        );
        if (response.status === 201) {
          setFormComment({ content: "" });
          handleProjectUpdate();
        } else {
          console.log("lỗi rồi ");
        }
      } catch (ex) {
        alert(ex);
      }
    }
  };
  const handleProjectUpdate = () => {
    setCount(count + 1);
  };

  return (
    <>
      <div className="relative">
        {user !== null && user.username === project.user.username ? (
          <div className="ml-auto flex absolute top-0 right-0">
            <span
              className="mr-[8px] inline-block p-[12px] text-white font-bold cursor-pointer rounded-[12px] bg-color-btn-info"
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
        ) : (
          <></>
        )}

        <h2 className="font-['Calistoga'] text-[40px] mb-[20px]">
          {project.nameProject}
        </h2>
        <h3 className="mb-[12px]">
          <FontAwesomeIcon icon={faCalendar} className="mr-[8px] w-[30px]" />
          {formatDate(project.createAt)} được tạo bởi{" "}
          <Link
            className="text-color-btn-main"
            to={`/profile?iduser=${project.user.id}`}>
            {project.user.firstName}
          </Link>
        </h3>
        <hr className="mb-[12px]" />
        <div className="my-[20px]">
          <ImagePost listImage={project.images} />
        </div>
        <h3 className="mb-[20px]">
          <FontAwesomeIcon icon={faThumbTack} className="mr-[8px] w-[30px]" />
          <strong>Mục đích:</strong> {project.purpose}
        </h3>
        <h3 className="mb-[20px]">
          <FontAwesomeIcon
            icon={faLocationCrosshairs}
            className="mr-[8px] w-[30px]"
          />
          <strong>Địa chỉ:</strong> {project.address}
        </h3>
        <h3 className="mb-[20px]">
          <FontAwesomeIcon icon={faClock} className="mr-[8px] w-[30px]" />
          <strong>Thời gian bắt đầu:</strong>{" "}
          {project.startTime ? project.startTime : "Chưa cập nhật"}
        </h3>
        <h3 className="mb-[20px]">
          <FontAwesomeIcon icon={faClock} className="mr-[8px] w-[30px]" />
          <strong>Thời gian kết thúc:</strong>{" "}
          {project.endTime ? project.endTime : "Chưa cập nhật"}
        </h3>
        <h3 className="mb-[20px]">
          <FontAwesomeIcon icon={faPiggyBank} className="mr-[8px] w-[30px]" />
          <strong>Số tiền đã huy động:</strong>{" "}
          {formatCurrency(project.amountRaised)}
        </h3>
      </div>
      <div>
        {user !== null && user.username !== project.user.username ? (
          <>
            <Button
              disabled={isRegisterProject}
              onClick={handleShowRegisterProject}
              className="mb-[8px] bg-[#308c5a] inline-block p-[12px] text-white font-bold cursor-pointer rounded-[12px] bg-color-btn-info">
              Đăng ký tham gia
            </Button>
            <RegisterProject
              project={project.id}
              showPopup={showRegisterProject}
              closePopup={handleCloseRegisterProject}
            />
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="bg-bg-color-donate p-[12px] rounded-[20px]">
        <div className="flex items-center justify-between">
          <label
            htmlFor="checkShowListJoinProject"
            className="cursor-pointer font-['Calistoga'] text-[25px]">
            Danh sách người tham gia
          </label>
          {!showListJoinProject ? (
            <FontAwesomeIcon icon={faAngleRight} className="text-[20px]" />
          ) : (
            <FontAwesomeIcon icon={faAngleDown} className="text-[20px]" />
          )}
        </div>

        <input
          type="checkbox"
          id="checkShowListJoinProject"
          checked={showListJoinProject}
          onChange={(e) => setShowListJoinProject(e.target.checked)}
          className="fixed z-[-1] top-0 left-0 opacity-0"
        />
        {showListJoinProject && (
          <Suspense>
            <ListJoinProject project={project} />
          </Suspense>
        )}
      </div>
      <div className="mt-[12px]">
        <h3 className="my-[8px] font-['Calistoga'] text-color-btn-main">
          Hãy gửi bình luận của bạn về dự án này
        </h3>
        <form onSubmit={handleSubmitComment}>
          <Form.Control
            required
            type="text"
            name="content"
            placeholder="Nhập bình luận..."
            value={formComment.content}
            onChange={handleContentChange}
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
          Danh sách bình luận
        </h2>
        <ul>
          {project.listComment !== null && project.listComment.length > 0 ? (
            project.listComment.map((item, id) => {
              return (
                <li key={id} className="border-b-[1px] border-black mb-[12px]">
                  <div className="flex items-center">
                    <img src={item.image} alt="" width={100} height={100} />
                    <div className="flex flex-column ml-[12px]">
                      <Link
                        className="text-color-btn-main"
                        to={`/profile?iduser=${item.idUser}`}>
                        <h3 className="comment-user-name">{item.username}</h3>
                      </Link>
                      <h4 className="comment-content">{item.content}</h4>
                    </div>

                    {user !== null && user.username === item.username ? (
                      <div className="ml-auto flex flex-column">
                        <button
                          className="mb-[8px] inline-block p-[12px] text-white font-bold cursor-pointer rounded-[12px] bg-color-btn-info"
                          onClick={() => handleShowEditCmt(id)}>
                          Sửa
                        </button>
                        {showEditCmt && (
                          <Suspense>
                            <EditCommentProject
                              comment={item}
                              showPopup={showEditCmt[id] || false}
                              onUpdateProject={handleProjectUpdate}
                              closePopup={() => handleCloseEditCmt(id)}
                            />
                          </Suspense>
                        )}
                        <button
                          onClick={() => {
                            if (
                              window.confirm(
                                "Bạn có chắc muốn xóa bình luận này ?"
                              )
                            ) {
                              handleDeleteComment(item.id);
                            }
                          }}
                          className="mb-[8px] inline-block p-[12px] text-white font-bold cursor-pointer rounded-[12px] bg-color-btn-danger">
                          Xóa
                        </button>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </li>
              );
            })
          ) : (
            <>Chưa có bình luận</>
          )}
        </ul>
      </div>
    </>
  );
}

export default DetailProject;
