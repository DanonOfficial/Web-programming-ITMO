import React from 'react';
import renderer from 'react-test-renderer';
import FavouriteCityComponent from "../components/FavouriteCityComponent";
import fetch from 'node-fetch'
import jest from 'jest-mock';
import {shallow, render, mount} from 'enzyme';
import FavouriteCitiesComponent from "../components/FavouriteCitiesComponent";
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from "redux-mock-store";
import {shallowToJson} from "enzyme-to-json";
import MainComponent from "../components/MainComponent";
import Loader from "../components/Loader";
import WeatherDataInfo from "../components/WeatherDataInfo";
import HeaderComponent from "../components/HeaderComponent";
import WeatherImageComponent from "../components/WeatherImageComponent";

configure({adapter: new Adapter()});


test('Test FavouriteCity loading render', () => {
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        json: () => mockJsonPromise,
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    const mockStore = configureMockStore();
    const store = mockStore({cities: []});
    const wrapper = shallow(
        <FavouriteCityComponent store={store} name='Moscow'/>).dive();
    wrapper.render();
    expect(shallowToJson(wrapper)).toMatchSnapshot();
});

test('Test FavouriteCity loaded city render', () => {
    const mockSuccessResponse = {
        "coord": {
            "lon": -0.13,
            "lat": 51.51
        },
        "weather": [
            {
                "id": 300,
                "main": "Drizzle",
                "description": "light intensity drizzle",
                "icon": "09d"
            }
        ],
        "base": "stations",
        "main": {
            "temp": 280.32,
            "pressure": 1012,
            "humidity": 81,
            "temp_min": 279.15,
            "temp_max": 281.15
        },
        "visibility": 10000,
        "wind": {
            "speed": 4.1,
            "deg": 80
        },
        "clouds": {
            "all": 90
        },
        "dt": 1485789600,
        "sys": {
            "type": 1,
            "id": 5091,
            "message": 0.0103,
            "country": "GB",
            "sunrise": 1485762037,
            "sunset": 1485794875
        },
        "id": 2643743,
        "name": "London",
        "cod": 200
    };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        json: () => mockJsonPromise,
    });

    global.fetch = require("node-fetch");
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    const mockStore = configureMockStore();
    const store = mockStore({cities: []});
    const wrapper = shallow(<FavouriteCityComponent store={store} name='Moscow'/>);
    wrapper.render();
    wrapper.dive().dive().instance().componentDidMount().then(() => {
        wrapper.render();
        expect(shallowToJson(wrapper)).toMatchSnapshot()
    });
});


test('Test Main weather component loading', () => {
    const wrapper = shallow(<MainComponent/>).dive();
    wrapper.render();
    wrapper.instance().setState({loaded: false});
    wrapper.render();
    expect(shallowToJson(wrapper)).toMatchSnapshot();
});

test('Test Main weather component loaded', () => {
    const mockSuccessResponse = {
        "coord": {
            "lon": -0.13,
            "lat": 51.51
        },
        "weather": [
            {
                "id": 300,
                "main": "Drizzle",
                "description": "light intensity drizzle",
                "icon": "09d"
            }
        ],
        "base": "stations",
        "main": {
            "temp": 280.32,
            "pressure": 1012,
            "humidity": 81,
            "temp_min": 279.15,
            "temp_max": 281.15
        },
        "visibility": 10000,
        "wind": {
            "speed": 4.1,
            "deg": 80
        },
        "clouds": {
            "all": 90
        },
        "dt": 1485789600,
        "sys": {
            "type": 1,
            "id": 5091,
            "message": 0.0103,
            "country": "GB",
            "sunrise": 1485762037,
            "sunset": 1485794875
        },
        "id": 2643743,
        "name": "London",
        "cod": 200
    };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        json: () => mockJsonPromise,
    });

    global.fetch = require("node-fetch");
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);


    const wrapper = shallow(<MainComponent/>);
    wrapper.render();
    wrapper.instance().setState({loaded: true, longitude: 0.0, latitude: 0.0});
    wrapper.instance().componentDidMount().then(() => {
        wrapper.render();
        expect(shallowToJson(wrapper)).toMatchSnapshot()
    });
});


test('Test FavouriteCities ', () => {
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        json: () => mockJsonPromise,
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    const mockStore = configureMockStore();
    const store = mockStore({cities: []});
    const wrapper = shallow(
        <FavouriteCitiesComponent store={store} name='Moscow'/>).dive();
    wrapper.render();
    expect(shallowToJson(wrapper)).toMatchSnapshot();
});

test('Loader rendered', () => {
    const wrapper = shallow(<Loader></Loader>);
    wrapper.render();
    expect(shallowToJson(wrapper)).toMatchSnapshot();
});

test('WeatherDataInfo rendered', () => {
    const wrapper = shallow(<WeatherDataInfo wind={10} description={'Weather'} pressure={'High'} humidity={'80'}
                                             longitude={20.1} latitude={20.1}/>)
    wrapper.render();
    expect(shallowToJson(wrapper)).toMatchSnapshot();
});

test('Header component rendered', () => {
    const wrapper = shallow(<HeaderComponent/>);
    wrapper.render();
    expect(shallowToJson(wrapper)).toMatchSnapshot();
});

test('WeatherImageComponent rendered', () => {
    const wrapper = shallow(<WeatherImageComponent image={'2b'}/>);
    wrapper.render();
    expect(shallowToJson(wrapper)).toMatchSnapshot();
});