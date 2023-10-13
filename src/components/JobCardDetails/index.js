import {Component} from 'react'
// import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {RiStarSFill} from 'react-icons/ri'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'

import Header from '../Header'

import SimilarJobItem from '../SimilarJobItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobCardDetails extends Component {
  state = {
    jobData: {},
    similarJobsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobsData()
  }

  getFormattedDataForSimilarJobs = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    title: data.title,
    lifeAtCompany: data.life_at_company,
    skills: data.skills,
  })

  getJobsData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    // console.log(response)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      console.log(fetchedData.job_details)

      const updatedData = this.getFormattedData(fetchedData.job_details)
      const updatedSimilarJobsData = fetchedData.similar_jobs.map(
        eachSimilarJob => this.getFormattedDataForSimilarJobs(eachSimilarJob),
      )

      this.setState({
        jobData: updatedData,
        similarJobsData: updatedSimilarJobsData,
        apiStatus: apiStatusConstants.success,
      })

      if (response.status === 404) {
        this.setState({
          apiStatus: apiStatusConstants.failure,
        })
      }
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderJobDetailsView = () => {
    const {jobData, similarJobsData} = this.state
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      lifeAtCompany,
      skills,
      companyWebsiteUrl,
    } = jobData

    return (
      <div className="job-details-success-view">
        <div className="job-card">
          <div className="img-title-rating-cont">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
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
            <p className="salary-txt">{packagePerAnnum}</p>
          </div>

          <hr className="hr-line" />

          <div className="desc-cont2">
            <h1 className="salary-txt">Description</h1>
            <a
              href={companyWebsiteUrl}
              className="hyper-link"
              target="_blank"
              rel="noreferrer"
            >
              Visit
              <BiLinkExternal />
            </a>
          </div>
          <p className="description-txt">{jobDescription}</p>

          <div className="skills-cont">
            <h1 className="skills-heading">Skills</h1>
            <ul className="ul-skill-list">
              {skills.map(eachSkill => (
                <li className="skill-cont" key={eachSkill.name}>
                  <img
                    src={eachSkill.image_url}
                    alt={eachSkill.name}
                    className="skill-img"
                  />
                  <p className="skill-name">{eachSkill.name}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="life-at-company-cont">
            <h1 className="skills-heading">Life at Company</h1>
            <div className="life-sub-cont">
              <p className="life-desc">{lifeAtCompany.description}</p>
              <img
                src={lifeAtCompany.image_url}
                className="life-at-company-img"
                alt="life at company"
              />
            </div>
          </div>
        </div>

        <div>
          <h1 className="skills-heading">Similar Jobs</h1>
          <ul className="ul-similar-jobs-cont">
            {similarJobsData.map(eachJob => (
              <SimilarJobItem key={eachJob.id} jobDetails={eachJob} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="jobs-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-img"
      />
      <h1 className="jobs-failure-heading-text">OOops! Something Went Wrong</h1>
      <p className="jobs-failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="retry-btn" onClick={this.getJobsData}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-card-details-bg-cont">
        <Header />
        <div>{this.renderJobDetails()}</div>
      </div>
    )
  }
}

export default JobCardDetails
