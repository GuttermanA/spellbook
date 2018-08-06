import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '../App';
import { expect } from 'chai'
import { shallow } from 'enzyme';


describe('App Component', () => {

  it('renders without crashing', () => {
    const mockFetchMetaData = jest.fn()
    const mockFetchUser = jest.fn()
    console.log(App)
    const div = document.createElement('div');
    const wrapper = shallow(<App fetchUser={mockFetchUser} fetchMetaData={mockFetchMetaData}/>)
    expect(wrapper.contains(<div className="App"/>)).to.equal(true)
    // ReactDOM.render(
    //   <Wrapper />
    //   , div);
    // ReactDOM.unmountComponentAtNode(div);
  });

})
