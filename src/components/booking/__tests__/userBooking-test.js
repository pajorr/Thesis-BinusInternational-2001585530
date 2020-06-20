import React from 'react';
import { shallow } from 'enzyme';

import Booking from '../userBooking';


describe('userLogin', () => {
    it('should render correctly in "debug" mode', () => {
        const component = shallow(<Booking debug/>);

        expect(component).toMatchSnapshot();
    });
});

//lifecycle methods

describe('userLogin', () => {
    it('calls componentDidMount', () => {
        jest.spyOn(Booking.prototype, 'componentDidMount');
        const wrapper = shallow(<Booking />);
        expect(Booking.prototype.componentDidMount.mock.calls.length).toBe(1)
    });
});
//
// const mockTryGetValue = jest.fn(() => false);
// const mockTrySetValue = jest.fn();
//
// jest.mock('userBooking', () => ({
//     SaveToStorage: jest.fn().mockImplementation(() => ({
//         tryGetValue: mockTryGetValue,
//         trySetValue: mockTrySetValue,
//     })),
// }));
//
// describe('userBooking', () => {
//     it('should set storage on booking button click', () => {
//         mockTryGetValue.mockReturnValueOnce(true);
//         const component = mount(<Booking/>);
//         component.find('button#bookingbutton').simulate('click');
//         expect(mockTryGetValue).toHaveBeenCalled();
//         expect(component).toMatchSnapshot();
//         component.unmount();
//     });
// });