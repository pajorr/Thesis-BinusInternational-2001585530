import React from 'react';
import { shallow } from 'enzyme';

import StaffCarList from '../staffCarList';


describe('userLogin', () => {
    it('should render correctly in "debug" mode', () => {
        const component = shallow(<StaffCarList debug/>);

        expect(component).toMatchSnapshot();
    });
});
