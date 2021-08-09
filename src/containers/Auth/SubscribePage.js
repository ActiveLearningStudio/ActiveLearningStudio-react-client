import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import loader from 'assets/images/loader.svg';
import terms from 'assets/images/terms.png';
import pdf from 'assets/pdf/Curriki_Subscription_Agreement.pdf';
import bg from 'assets/images/loginbg.png';
import bg1 from 'assets/images/loginbg2.png';
import { acceptTermsAction } from 'store/actions/auth';

import Logo from './Logo';

import './style.scss';

class SubscribePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allTerms: false,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  onSubmitTerms = async (e) => {
    e.preventDefault();

    const { allTerms } = this.state;
    const { acceptTerms } = this.props;

    if (allTerms) {
      const { history } = this.props;
      acceptTerms();
      history.push('/studio');
    }
  };

  render() {
    const { allTerms } = this.state;
    const { isLoading } = this.props;

    return (
      <div className="auth-page">
        <Logo />

        <div className="auth-container terms-section">
          <div className="flex-terms">
            <img src={terms} alt="" />
            <div>
              <h1>Free to Create</h1>
              <h3>
                I understand that using the CurrikiStudio online service is subject
                to the Curriki Subscription Agreement and Privacy Policy.
              </h3>
            </div>
          </div>

          <form
            autoComplete="off"
            onSubmit={this.onSubmitTerms}
          >
            <h4
              onClick={() => {
                this.setState((prevState) => ({
                  allTerms: !prevState.allTerms,
                }));
              }}
            >
              <FontAwesomeIcon icon={['far', allTerms ? 'check-square' : 'square']} className="mr-2" />
              I agree to the Curriki
              <a
                onClick={() => {
                  window.open(
                    pdf,
                    ' Subscription Agreement',
                    'width=500,height=500',
                  );
                }}
              >
                Subscription Agreement &nbsp;
              </a>
              and
              <a
                onClick={() => {
                  window.open(
                    'https://www.curriki.org/privacy-policy/',
                    ' Subscription Agreement',
                    'width=500,height=500',
                  );
                }}
              >
                Privacy policy
              </a>
            </h4>

            <div className="form-group">
              <button type="submit" className="btn btn-primary submit" disabled={isLoading || !allTerms}>
                {isLoading ? (
                  <img src={loader} alt="" />
                ) : (
                  'Accept & Connect'
                )}
              </button>
            </div>
          </form>
        </div>

        <img src={bg} className="bg1" alt="" />
        <img src={bg1} className="bg2" alt="" />
      </div>
    );
  }
}

SubscribePage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  acceptTerms: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  acceptTerms: () => dispatch(acceptTermsAction()),
});

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SubscribePage),
);
