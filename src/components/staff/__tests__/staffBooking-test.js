import React from 'react';
import { shallow } from 'enzyme';

import StaffBooking from '../staffBooking';


describe('userLogin', () => {
    it('should render correctly in "debug" mode', () => {
        const component = shallow(<StaffBooking debug/>);

        expect(component).toMatchSnapshot();
    });
});
