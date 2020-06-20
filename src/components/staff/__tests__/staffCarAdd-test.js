import React from 'react';
import { shallow } from 'enzyme';

import StaffCarAdd from '../staffCarAdd';


describe('userLogin', () => {
    it('should render correctly in "debug" mode', () => {
        const component = shallow(<StaffCarAdd debug/>);

        expect(component).toMatchSnapshot();
    });
});
