import {RiStarSFill} from 'react-icons/ri'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = jobDetails

  return (
    <li className="similar-job-list-item2">
      <div className="img-title-rating-cont">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
      <h1 className="desc-heading">Description</h1>
      <p className="job-desc">{jobDescription}</p>
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
    </li>
  )
}

export default SimilarJobItem
