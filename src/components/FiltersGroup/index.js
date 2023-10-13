import ProfileCard from '../ProfileCard'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const FiltersGroup = props => {
  const {changeSalaryRange, updateEmploymentTypeList} = props

  const onClickSalaryRange = salaryRangeId => {
    changeSalaryRange(salaryRangeId)
  }

  const onClickEmploymentType = employmentTypeId => {
    updateEmploymentTypeList(employmentTypeId)
  }

  return (
    <div>
      <ProfileCard />
      <hr className="hr-line" />
      <h1 className="empl-heading">Type of Employment</h1>
      <ul className="ul-emp-type">
        {employmentTypesList.map(eachType => (
          <li className="list-item" key={eachType.employmentTypeId}>
            <input
              type="checkbox"
              id={eachType.employmentTypeId}
              value={eachType.label}
              onClick={() => onClickEmploymentType(eachType.employmentTypeId)}
            />
            <label
              className="employement-type"
              htmlFor={eachType.employmentTypeId}
            >
              {eachType.label}
            </label>
          </li>
        ))}
      </ul>
      <hr className="hr-line" />
      <h1 className="empl-heading">Salary Range</h1>
      <ul>
        {salaryRangesList.map(eachType => (
          <li
            className="list-item"
            key={eachType.salaryRangeId}
            onClick={() => onClickSalaryRange(eachType.salaryRangeId)}
          >
            <input
              type="radio"
              id={eachType.salaryRangeId}
              value={eachType.label}
              name="salaryRange"
            />
            <label
              className="employement-type"
              htmlFor={eachType.salaryRangeId}
            >
              {eachType.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FiltersGroup
