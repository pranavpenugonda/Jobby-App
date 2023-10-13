import {Link} from 'react-router-dom'

import {RiStarSFill} from 'react-icons/ri'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobDetails

  return (
    <li className="job-card">
      <Link to={`/jobs/${id}`} className="link-item">
        <div className="img-title-rating-cont">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="title-rating-cont">
            <h1 className="title-txt">{title}</h1>
            <div className="rating-cont">
              <RiStarSFill className="star-icon" />
              <p className="rating-txt">{rating}</p>
            </div>
          </div>
        </div>

        <div className="loc-emp-salary-cont">
          <div className="loc-emp-cont">
            <div className="loc-cont">
              <MdLocationOn className="location-icon" />
              <p className="rating-txt">{location}</p>
            </div>
            <div className="loc-cont">
              <BsBriefcaseFill className="location-icon" />
              <p className="rating-txt">{employmentType}</p>
            </div>
          </div>
          <h1 className="salary-txt">{packagePerAnnum}</h1>
        </div>

        <hr className="hr-line" />

        <div className="desc-cont">
          <h1 className="salary-txt">Description</h1>
          <p className="description-txt">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobCard
