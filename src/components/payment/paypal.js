import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

export default class Paypal extends React.Component {
    render() {
        const client = {
            sandbox:    'AbqSx8i-kX1D6W2hfNaxJpw0QyoYM_YWp78WuJBHqA2HTfNeoheZDTWR6JNJcCQc3r07hW-tN3cXNqYI',
            production: 'YOUR-PRODUCTION-APP-ID',
        }
        return (
            <PaypalExpressBtn client={client} currency={'AUD'} total={5.00} />
        );
    }
}