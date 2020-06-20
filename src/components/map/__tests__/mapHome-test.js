import React from 'react';
import { shallow } from 'enzyme';

import mapHome from '../mapHome';


describe('userLogin', () => {
    it('should render correctly in "debug" mode', () => {
        const component = shallow(<mapHome debug/>);

        expect(component).toMatchSnapshot();
    });
});
