import React from 'react';
import { shallow } from 'enzyme';

import StaffLanding from '../staffLanding';


describe('userLogin', () => {
    it('should render correctly in "debug" mode', () => {
        const component = shallow(<StaffLanding debug/>);

        expect(component).toMatchSnapshot();
    });
});
