import React,{useState, useEffect} from 'react'
import CaptainCard from "../../components/Captain/CaptainCard";


const Captains = () => {
  const[data, setData] = useState([]);
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const api = `http://localhost:8000/api/captains?name=${name}&&specialization=${specialization}`;
  useEffect(() => {
    (async function () {
      const data = await fetch(api).then((res)=>res.json());
      setData(data);
    })();
  }, [api])
  console.log(data);
  
  return (
    <>
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <h2 className="heading">Find a Captain</h2>
          <div className="max-w-[570] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">

            <input 
            onChange={(e)=>{
              setSpecialization(e.target.value)
              // setName(e.target.value)
            }}
            type="search" 
            className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor" 
            placeholder="Search Captain"
            />

            <button className="btn mt-0 rounded-[0px] rounded-r-md">Search</button>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {data.map(doctor => (
              <CaptainCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">What our customers say</h2>
            <p className="text__para text-center">
            Super easy to book, and the service was top-notch! The professional arrived on time and did a great job. I’ll definitely use this service again!
            </p>
          </div>
          {/* <Testimonial /> */} 
        </div>
      </section>
    </>
    );
};

export default Captains;