import React from 'react';
import './cardForm.scss';

const CardForm = () => {
  return (
    <form action="submit">
      <div className="form-container">
          <select className="form-control" id="exampleFormControlSelect1">
            <option>Test Font</option>
            <option>2</option>
          </select>
          <select className="form-control" id="exampleFormControlSelect1">
            <option>Test Font</option>
            <option>2</option>
          </select>
          <div className="form-group-1">
            <input className="input tournament-name" placeholder="Nome do Campeonato" type="text" />
            <div className ="form-schedule"></div>
          </div>
          <div className="form-group-2">
            <input className="input team-name" type="text" />
            <div className="versus">VS</div>
            <input className="input team-name" type="text" />
          </div>
      </div>
    </form>
  )
}

export default CardForm;
