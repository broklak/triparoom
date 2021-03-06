import React, { Component } from 'react';
import { ADDITIONAL_FIELD } from '../../../../config/flightField';
import _ from 'lodash';
import { Field, formValueSelector } from 'redux-form';
import { Country } from '../../../utils/country.js';
import Select from 'react-select';
import MonthYearPicker from '../../../utils/monthYearPicker';

class AdditionalField extends Component {
  constructor(props) {
    super(props);
  }

  renderTextField(field) {
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input
          type={field.type}
          name={field.name}
          className="form-control"
          placeholder={field.placeholder}
          {...field.input}
        />
      </div>
    );
  }

  showBirthField(field) {
    return (
      <MonthYearPicker
        field={field}
        minmax={field.minmax}
        {...field.input}
       />
    );
  }

  comboboxResource(resource) {
    return _.map(resource, (opt) => {
      return(
        <option key={opt.id} value={opt.id}>{opt.name}</option>
      );
    });
  }

  showField(field, payload, typeKey, count) {
    if(field.indexOf("checkinbaggage") !== -1) {
      let fieldName = field.substring(0, 15);
      let transitNum = field.substr(-2, 1);
      let placeHolder = (field.charAt(0) == 'r') ? 'Pulang' : 'Pergi'
      return (
        <div className="col-md-6">
            <label>Bagasi {placeHolder}</label>
            <Field name={`${fieldName}${typeKey}${transitNum}${count}`} required className="select_booking" component="select">
              <option value="">Pilih Bagasi Penerbangan {placeHolder}</option>
              {this.comboboxResource(payload.resource)}
            </Field>
        </div>
      );
    }

    if(field.indexOf("passportnationality") !== -1 || field.indexOf("passportissuing") !== -1) {
      let name = (field == 'passportnationalitya1') ? 'passportnationality' : 'passportissuing';
      let placeholder = (field == 'passportnationalitya1') ? 'Pilih Kewarganegaraan' : 'Pilih Negara Penerbit Passport';
      let label = (field == 'passportnationalitya1') ? 'Kewarganegaraan' : 'Negara Penerbit Passport';
      return(
        <div className="col-md-6">
            <label>{label}</label>
            <Field
              name={`${name}${typeKey}${count}`}
              value="id"
              component={props =>
                <Select
                  value={props.input.value}
                  onChange={value => props.input.onChange(value)}
                  onBlur={() => props.input.onBlur(props.input.value)}
                  options={Country}
                  placeholder={placeholder}
                  className="select_booking"
                  simpleValue
                />
              }
            />
        </div>
      );
    }

    if(field.indexOf("passportno") !== -1) {
      return(
        <div className="col-md-6">
            <Field
              required
              name={`passportno${typeKey}${count}`}
              type="text"
              label="Nomor Passport"
              placeholder="Masukkan Nomor Passport"
              component={this.renderTextField}
            />
        </div>
      );
    }

    if(field.indexOf("passportExpiryDate") !== -1 || field.indexOf("passportissueddate") !== -1) {
      let placeHolder = '';
      let label = '';
      let nameField = '';
      let type = '';

      if(field == 'passportissueddatea1') {
        placeHolder = 'Masukkan Tanggal Terbit Passport';
        label = 'Tanggal Terbit Passport';
        nameField = 'passportissueddate';
        type = 'issued';
      } else {
        placeHolder = 'Masukkan Tanggal Kadaluarsa Passport';
        label = 'Tanggal Kadaluarsa Passport';
        nameField = 'passportExpiryDate';
        type = 'expired';
      }

      return(
        <div className="col-md-6">
            <Field
              label={label}
              name={`${nameField}${typeKey}${count}`}
              minmax={type}
              type="text"
              placeholder={placeHolder}
              component={this.showBirthField}
            />
        </div>
      );
    }
  }

  renderField() {
    let addField = [];
    let x = 0;
    return _.map(ADDITIONAL_FIELD, (field) => {
      x++;
      if(_.has(this.props.mandatory, field)) {
        return (
          <div key={`${this.props.typeKey}${field}`}>
          {this.showField(field, this.props.mandatory[field], this.props.typeKey, this.props.count)}
          </div>
        );
      }
    });
  }

  render() {
    return(
      <div>
        {this.renderField()}
      </div>
    );
  }
}

export default AdditionalField;
