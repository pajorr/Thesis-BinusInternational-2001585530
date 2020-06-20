import React from 'react';
import { shallow } from 'enzyme';

import StaffUserList from '../staffUserList';


describe('userLogin', () => {
    it('should render correctly in "debug" mode', () => {
        const component = shallow(<StaffUserList debug/>);

        expect(component).toMatchSnapshot();
    });
});
