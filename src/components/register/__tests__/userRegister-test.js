import React from 'react';
import { shallow } from 'enzyme';

import Register from '../userRegister';


describe('userLogin', () => {
    it('should render correctly in "debug" mode', () => {
        const component = shallow(<Register debug/>);

        expect(component).toMatchSnapshot();
    });
});
