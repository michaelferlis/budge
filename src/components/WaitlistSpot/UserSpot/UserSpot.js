import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

// import Semantic UI Component 
import { Grid, Button, Divider, Modal, Icon, Header } from 'semantic-ui-react'


const styles = {
    headingOne: {
        fontWeight: '300',
        display: 'inline-block',
    },
    headingTwo: {
        fontWeight: '300',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        fontSize: '1.25rem',
        borderBottom: '1px solid black',
        display: 'inline-block',
    },
    headingThree: {
        fontWeight: '300',
        textTransform: 'uppercase',
        marginTop: '5px',
        marginBottom: '5px',
    },
    headingFour: {
        color: 'black',
        fontWeight: '300',
        textTransform: 'uppercase',
    },
    backButton: {
        position:'absolute',
        bottom: '0',
        padding: '20px 0px',
        fontWeight: '300',
        fontSize: '1.5rem',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        borderRadius: '0',
        boxSizing: 'border-box',
    }
}


class UserSpot extends Component {

    state = {
        offerMade: {},
        offerReceived: {},
        retractModal: false,
    }

    componentDidMount() {
        this.getOffers();
    }

    // function to get the id of any offer made
    // and any offer received
    getOffers = () => {
        axios.get(`/api/offers/user?venue=${this.props.selectedSpot.restaurant_id}&waitlist=${this.props.selectedSpot.id}`)
            .then(response => {
                this.setState({
                    offerMade: response.data.offerMade,
                    offerReceived: response.data.offerReceived,
                })
            })
            .catch(error => {
                console.log('Error in getting offers for user', error);
            })
    }

    retractOffer = () => {
        console.log(`Retracting offer ${this.state.offerMade.offer_id}......please hold.`);
        this.toggleRetractModal();
        axios.put(`/api/offers/buyer-retract`, {
            offerId: this.state.offerMade.offer_id,
            statusCode: 3,
        })
            .then(response => {
                this.getOffers();
            })
            .catch(error => {
                console.log('Error retracting offer', error);
            })
    }

    viewOffer = () => {
        this.props.history.push(`/seller-offer?offerId=${this.state.offerReceived.offer_id}&buyer=${this.state.offerReceived.buyer_id}&venue=${this.state.offerReceived.restaurant_id}&waitlist=${this.props.selectedSpot.id}`)
    }

    toggleRetractModal = () => {
        this.setState({
            retractModal: !this.state.retractModal
        })
    }

    render() {
        return (
            <div>
                <Grid centered>
                    <Grid.Row>
                        <Grid.Column width={16} textAlign="center">
                            <h2 style={styles.headingTwo}>Status at</h2>
                        </Grid.Column>
                        <Grid.Column width={16} textAlign="center">
                            <h1 style={styles.headingOne}>{this.props.selectedVenue.restaurant_name}</h1>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={16} textAlign="center">
                            <h3 style={{...styles.headingThree, borderBottom: '1px solid black', display: 'inline-block'}}>Offer Made</h3>
                        </Grid.Column>
                        <>
                            {this.state.offerMade ?
                                <>
                                    <Grid.Column width={16}>
                                        {/* <h3 style={styles.headingThree}>To: {this.state.offerMade.user_id}</h3> */}
                                        <h3 style={styles.headingThree}>Est. Wait Time: {this.state.offerMade.latest_wait_time} min</h3>
                                        <h3 style={styles.headingThree}>Amount: ${this.state.offerMade.offer_price}</h3>
                                    </Grid.Column>
                                    <Grid.Column width={16} textAlign="center">
                                        <Button color="red" onClick={this.toggleRetractModal}>Retract Offer</Button>
                                    </Grid.Column>
                                </>
                                :
                                <Grid.Column width={16} textAlign="center">
                                    <h4 style={{marginTop: '10px', ...styles.headingFour}}>You haven't made any offers</h4>
                                    <br />
                                    <h3 style={styles.headingThree}>Get Budging!</h3>
                                </Grid.Column>
                            }
                        </>
                    </Grid.Row>
                    <Divider />
                    <Grid.Row>
                        <Grid.Column width={16} textAlign="center">
                            <h3 style={{...styles.headingThree, borderBottom: '1px solid black', display: 'inline-block'}}>Offer Received</h3>
                        </Grid.Column>
                        <>
                            {this.state.offerReceived ?
                                <>
                                    <Grid.Column width={16}>
                                        {/* <h3 style={styles.headingThree}>From: {this.state.offerReceived.buyer_id}</h3> */}
                                        <h3 style={styles.headingThree}>Est. Wait Time: {this.state.offerReceived.latest_wait_time} min</h3>
                                        <h3 style={styles.headingThree}>Amount: ${this.state.offerReceived.offer_price}</h3>
                                    </Grid.Column>
                                    <Grid.Column width={16} textAlign="center">
                                        <Button color="green" onClick={this.viewOffer}>View Offer</Button>
                                    </Grid.Column>

                                </>
                                :
                                <h4 style={{marginTop: '10px', ...styles.headingFour}}>You haven't received any offers</h4>
                            }
                        </>
                    </Grid.Row>
                </Grid>
                <Button color="grey" style={styles.backButton} fluid onClick={() => this.props.history.push(`/venue/${this.props.selectedVenue.id}`)}>Back to Wait List</Button>

                {/* Below is the dialog for retract offer confirmation */}
                {this.state.offerMade &&
                    <Modal
                        open={this.state.retractModal}
                        basic
                        style={{ maxWidth: '90vw' }}
                    >
                        <Header icon='question circle outline' content='Are you sure?' />
                        <Modal.Content>
                            <h3>You don't want to budge for this spot?</h3>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color='red' onClick={this.toggleRetractModal} inverted>
                                <Icon name='checkmark' />Nope
                            </Button>
                            <Button color='green' onClick={this.retractOffer} inverted>
                                <Icon name='checkmark' />Yep
                            </Button>
                        </Modal.Actions>
                    </Modal>
                }
            </div>
        )
    }
}

const MapStateToProps = reduxState => ({
    reduxState,
    user: reduxState.user,
    selectedVenue: reduxState.selectedVenue,
    selectedSpot: reduxState.selectedSpot,
})

export default connect(MapStateToProps)(UserSpot);

