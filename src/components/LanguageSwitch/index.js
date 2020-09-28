import React, { useContext } from 'react'
import LanguagesContext from '../../utils/LanguagesContext'

const LanguageSwitch = () => {
  const { language, languages, handleLanguageChange } = useContext(LanguagesContext)

  return (
    <>
      <label>Switch Language:</label>
      <select onChange={handleLanguageChange}>
        {languages.map(l => <option value={l}>{l}</option>)}
      </select>
    </>
  )
}

export default LanguageSwitch