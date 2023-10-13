import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {AiOutlineSearch} from 'react-icons/ai'

import JobCard from '../JobCard'

import FiltersGroup from '../FiltersGroup'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllJobsSection extends Component {
  state = {
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
    jobsList: [],
    activeEmployementlist: [],
    activeSalaryRange: '',
  }

  componentDidMount() {
    this.getJobCards()
  }

  getJobCards = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {searchInput, activeSalaryRange, activeEmployementlist} = this.state

    const url = `https://apis.ccbp.in/jobs?employment_type=${activeEmployementlist}&minimum_package=${activeSalaryRange}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    // console.log(response)
    if (response.ok) {
      const fetchedData = await response.json()
      //   console.log(fetchedData)

      const updatedData = fetchedData.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  changeSearchInput = searchInput => {
    this.setState({searchInput})
  }

  enterSearchInput = () => {
    this.getJobCards()
  }

  updateEmploymentTypeList = employmentTypeId => {
    this.setState(
      prevState => ({
        activeEmployementlist: [
          ...prevState.activeEmployementlist,
          employmentTypeId,
        ],
      }),
      this.getJobCards,
    )
  }

  changeSalaryRange = activeSalaryRange => {
    this.setState({activeSalaryRange}, this.getJobCards)
  }

  onClickSearchInput = () => {
    this.getJobCards()
  }

  renderSuccessView = () => {
    const {jobsList} = this.state
    const showJobsList = jobsList.length > 0

    return showJobsList ? (
      <div className="cont2">
        <ul className="job-cards-cont">
          {jobsList.map(eachJobItem => (
            <JobCard jobDetails={eachJobItem} key={eachJobItem.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-jobs-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs-img"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-desc">
          We could not find any jobs. Try other filters
        </p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="jobs-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt=" failure view"
        className="jobs-failure-img"
      />
      <h1 className="jobs-failure-heading-text">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="retry-btn" onClick={this.getJobCards}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="jobs-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onUpdateSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderAllJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state

    return (
      <div className="all-jobs-section-bg-cont">
        <FiltersGroup
          //   activeEmployementType={activeEmployementType}
          //   activeSalaryRange={activeSalaryRange}
          updateEmploymentTypeList={this.updateEmploymentTypeList}
          changeSalaryRange={this.changeSalaryRange}
        />
        <div>
          <div className="search-container">
            <input
              type="search"
              placeholder="Search"
              value={searchInput}
              onChange={this.onUpdateSearchInput}
              className="input-element"
            />
            <button
              type="button"
              data-testid="searchButton"
              className="search-btn"
              onClick={this.onClickSearchInput}
            >
              <AiOutlineSearch className="search-icon" />
            </button>
          </div>
          {this.renderAllJobs()}
        </div>
      </div>
    )
  }
}
export default AllJobsSection
