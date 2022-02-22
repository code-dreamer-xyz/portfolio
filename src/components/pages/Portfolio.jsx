import React, { useState, useLayoutEffect } from "react";
import Section from "../Section";
import ProjectView from "../ProjectView";
import { Swiper, SwiperSlide } from "swiper/react";
import _ from "lodash";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "../../assets/styles/portfolio-section.sass";
export default function Portfolio({ slider }) {
  const [data, setData] = useState([]);
  useLayoutEffect(() => {
    fetch("../../data/projects.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);
  if (!_.isEmpty(data))
    return (
      <div className="pt-xl-4" data-aos id="portfolio">
        {slider ? (
          <div className="d-none d-xl-flex fixed">
            <div className="projects-bullets"></div>
          </div>
        ) : (
          <></>
        )}

        <Section dir="rtl" head="my portfolio">
          <div className="col">
            <div className="works-area">
              <p data-aos="fade-right" className="sec-title">
                <span>03.</span>Somethings I’ve Built
              </p>
              <div id="portfolio-works-container">
                {slider ? (
                  <>
                    <Swiper
                      spaceBetween={50}
                      speed={2000}
                      modules={[Navigation, Pagination]}
                      navigation={{
                        nextEl: ".nav-btns .next-work-btn",
                        prevEl: ".nav-btns .prev-work-btn",
                      }}
                      pagination={{
                        el: ".projects-bullets",
                        clickable: true,
                      }}
                    >
                      {data.map((project) => {
                        return (
                          <SwiperSlide key={project.index}>
                            <ProjectView project={project} slider />
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                    <div className="nav-btns">
                      <button data-aos="fade-left" className="prev-work-btn">
                        <i className="fad fa-chevron-double-left me-3"></i>
                        <p className="m-0">
                          <span className="d-none d-md-block txt">
                            Prev Project
                          </span>
                        </p>
                      </button>
                      <button data-aos="fade-right" className="next-work-btn">
                        <p className="m-0">
                          <span className="d-none d-md-block txt">
                            Next Project
                          </span>
                        </p>
                        <i className="fad fa-chevron-double-right ms-3"></i>
                      </button>
                    </div>
                  </>
                ) : (
                  data.map((project) => {
                    return (
                      <SwiperSlide key={project.index}>
                        <ProjectView project={project} />
                      </SwiperSlide>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </Section>
      </div>
    );
  return <></>;
}
