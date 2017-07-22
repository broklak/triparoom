import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Field, reduxForm, formValueSelector } from 'redux-form';
import { checkoutOrder } from '../../actions/actionOrderHotel';
import { bindActionCreators } from 'redux';
import { TIKET_ROOT_URL } from '../../../config/api';

class CheckoutCustomerField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToHotel: false
    }
  }

  renderTextField(field) {
    return (
      <div className="form-group">
        <input
          required
          type="{field.type}"
          name={field.name}
          className="form-control"
          placeholder={field.placeholder}
          {...field.input}
        />
      </div>
    );
  }

  onSubmitCheckout(values) {
    const token = localStorage.tiketToken;

    const url = `${TIKET_ROOT_URL}/checkout/checkout_payment?checkouttoken=${token}`;
    const order_detail_id = this.props.order.order_detail_id;
    const order_id = this.props.order.order_id;
    this.props.checkoutOrder(values, order_detail_id, order_id, () => {
      window.location.href = url;
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <div className="booking_detail white-box animate-reveal">
          <h4>Personal information</h4>
          <div className="row">
            <form onSubmit={handleSubmit(this.onSubmitCheckout.bind(this))}>
              <div className="col-md-6">
                <Field name="salute" className="select_booking" component="select">
                  <option>Mr</option>
                  <option>Mrs</option>
                  <option>Ms</option>
                </Field>
              </div>
              <div className="col-md-6">
                <Field
                  name="first_name"
                  type="text"
                  placeholder="Enter Guest First Name..."
                  component={this.renderTextField}
                />
              </div>
              <div className="col-md-6">
                <Field
                  name="last_name"
                  type="text"
                  placeholder="Enter Guest Last Name..."
                  component={this.renderTextField}
                />
              </div>
              <div className="col-md-6">
                <Field
                  name="email"
                  type="email"
                  placeholder="Enter Guest Email Address..."
                  component={this.renderTextField}
                />
              </div>
              <div className="col-md-6">
                <Field
                  name="phone"
                  type="text"
                  placeholder="Enter Guest Phone Number..."
                  component={this.renderTextField}
                />
              </div>
              <div className="col-md-12">
                <label>You will be redirected to Tiket.com payment confirmation page</label>
              </div>
              <div className="col-md-12">
                <p><button className="btn_book" type="submit">Confirm Booking</button></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ checkoutOrder }, dispatch);
}

export default reduxForm({
  form: 'Checkout'
}) (
    connect(null, mapDispatchToProps) (CheckoutCustomerField)
);
