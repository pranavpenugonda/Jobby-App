import {Component} from 'react'

import AllJobsSection from '../AllJobsSection'
import Header from '../Header'

import './index.css'

class Jobs extends Component {
  render() {
    return (
      <div className="jobs-bg-container">
        <Header />
        <div className="jobs-bg-container2">
          <div className="jobs-cont-1">
            <hr className="hr-line" />
          </div>
          <div className="jobs-cont-2">
            <AllJobsSection />
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
