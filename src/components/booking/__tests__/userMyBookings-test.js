import React from 'react';
import { shallow } from 'enzyme';

import MyBooking from '../userMyBookings';


describe('userLogin', () => {
    it('should render correctly in "debug" mode', () => {
        const component = shallow(<MyBooking debug/>);

        expect(component).toMatchSnapshot();
    });
});
