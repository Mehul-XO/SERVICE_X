import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import doctorImg from "../../assets/images/doctor-img02.png";
import starIcon from '../../assets/images/Star.png';
// import DoctorAbout from "./DoctorAbout";
// import Feedback from "./Feedback";
// import SidePanel from "./SidePanel";

const CaptainDetails = () => {
  let { id } = useParams();
  const [tab, setTab] = useState('about');
  const [data, setData] = useState({});

  const api = `http://localhost:8000/api/captains/${id}`;
  useEffect(() => {
    (async function() {
      const result = await fetch(api).then((res)=>res.json());
      setData(result);
    })()
  }, [api])

  const {_id,name,email,phone,ticketPrice,specialization,qualifications,experiences,bio,about,timeslots,reviews,averageRating,totalRating,isApproved,Appointments} = data;
  
  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        <div className="grid md:grid-cols-3 gap-[50px]">
          <div className="md:col-span-2">
            <div className="flex items-center gap-5">
              <figure className="max-w-[200px] max-h-[200px]">
                <img src={doctorImg} alt="doctor-img02" className="w-full" />
              </figure>

              <div>
                <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
                  {specialization}
                </span>
                <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">
                  {name}
                </h3>
                <div className="flex items-center gap-[6px]">
                  <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                    <img src={starIcon} alt="Star" /> {averageRating}
                  </span>
                  <span className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] text-textColor">({totalRating})</span>
                </div>

                <p className="text__para text-[14px] leading-6 md:text-[15px] lg:max-w-[390px]">
                  {bio}
                </p>
              </div>
            </div>

            <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
              <button
                onClick={() => setTab('about')}
                className={`${tab === "about" && "border-b border-solid border-primaryColor"} py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
              >
                About
              </button>
              <button
                onClick={() => setTab('feedback')}
                className={`${tab === "feedback" && "border-b border-solid border-primaryColor"} py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
              >
                Feedback
              </button>
            </div>

            {/* <div className="mt-[50px]">
              {tab === 'about' && <DoctorAbout name={name} about={about} qualifications={qualifications} experiences={experiences}/>}
              {tab === 'feedback' && <Feedback reviews={reviews}/>}
            </div> */}
          </div>

          {/* <div>
            <SidePanel ticketPrice={ticketPrice} timeslots={timeslots}/>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default CaptainDetails;