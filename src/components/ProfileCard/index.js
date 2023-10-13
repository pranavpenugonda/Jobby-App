import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProfileCard extends Component {
  state = {
    username: '',
    designation: '',
    profileImg: '',
    apiStatusForProfile: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfileData()
  }

  getProfileData = async () => {
    this.setState({
      apiStatusForProfile: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      this.setState({
        username: fetchedData.profile_details.name,
        designation: fetchedData.profile_details.short_bio,
        profileImg: fetchedData.profile_details.profile_image_url,
        apiStatusForProfile: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatusForProfile: apiStatusConstants.failure,
      })
    }
  }

  renderProfileSuccessView = () => {
    const {username, designation, profileImg} = this.state
    return (
      <div className="user-account-card">
        <img src={profileImg} alt="profile" className="profile-img" />
        <h1 className="name-txt">{username}</h1>
        <p className="designation-txt">{designation}</p>
      </div>
    )
  }

  renderProfileLoadingView = () => (
    <div className="jobs-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderProfileFailureView = () => (
    <button type="button" className="retry-btn" onClick={this.getProfileData}>
      Retry
    </button>
  )

  renderProfileView = () => {
    const {apiStatusForProfile} = this.state

    switch (apiStatusForProfile) {
      case apiStatusConstants.success:
        return this.renderProfileSuccessView()
      case apiStatusConstants.failure:
        return this.renderProfileFailureView()
      case apiStatusConstants.inProgress:
        return this.renderProfileLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderProfileView()}</div>
  }
}

export default ProfileCard
