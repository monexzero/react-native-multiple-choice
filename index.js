'use strict';

import React from 'react'
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ListView,
  ViewPropTypes
} from 'react-native';
import PropTypes from 'prop-types'

import BaseComponent from './BaseComponent';
import Styles from './styles';

const propTypes = {
    options: PropTypes.array.isRequired,
    selectedOptions: PropTypes.array,
    maxSelectedOptions: PropTypes.number,
    onSelection: PropTypes.func,
    renderIndicator: PropTypes.func,
    renderSeparator: PropTypes.func,
    renderRow: PropTypes.func,
    renderText: PropTypes.func,
    style: ViewPropTypes.style,
    optionStyle: ViewPropTypes.style,
    disabled: PropTypes.bool
};

const defaultProps = {
    options: [],
    selectedOptions: [],
    onSelection(option){},
    style:{},
    optionStyle:{},
    disabled: false
};

class MultipleChoice extends BaseComponent {
    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => true});
        this.ds = ds;

        this.state = {
            dataSource: ds.cloneWithRows(this.props.options),
            selectedOptions: this.props.selectedOptions || [],
            disabled: this.props.disabled
        };

        this._bind(
            '_renderRow',
            '_selectOption',
            '_isSelected',
            '_updateSelectedOptions'
        );
    }

    componentWillReceiveProps(nextProps) {
        this._updateSelectedOptions(nextProps.selectedOptions, nextProps.options);
        this.setState({
            disabled: nextProps.disabled
        });
    }

    _updateSelectedOptions(selectedOptions, options) {
        this.setState({
            selectedOptions,
            dataSource: this.ds.cloneWithRows(options)
        });
    }

    _validateMaxSelectedOptions() {
        const maxSelectedOptions = this.props.maxSelectedOptions;
        const selectedOptions = this.state.selectedOptions;

        if (maxSelectedOptions && selectedOptions.length > 0 && selectedOptions.length >= maxSelectedOptions) {
            selectedOptions.splice(0, 1);
        }

        this._updateSelectedOptions(selectedOptions);
    }

    _selectOption(rowID) {

        let selectedOptions = this.state.selectedOptions;
        const index = selectedOptions.indexOf(rowID);

        if (index === -1) {
            this._validateMaxSelectedOptions();
            selectedOptions.push(rowID);
        } else {
            selectedOptions.splice(index, 1);
        }

        this._updateSelectedOptions(selectedOptions);

        //run callback
        this.props.onSelection(rowID);
    }

    _isSelected(rowID) {
        return this.state.selectedOptions.indexOf(rowID) != -1;
    }

    _renderIndicator(option, rowID) {
        if (this._isSelected(rowID)) {
            if(typeof this.props.renderIndicator === 'function') {
                return this.props.renderIndicator(option);
            }

            return (
                <Image
                    style={Styles.optionIndicatorIcon}
                    source={require('./assets/images/check.png')}
                />
            );
        }
    }

    _renderSeparator(option) {
        if(typeof this.props.renderSeparator === 'function') {
            return this.props.renderSeparator(option);
        }

        return (<View style={Styles.separator}></View>);
    }

    _renderText(option) {

        if(typeof this.props.renderText === 'function') {
            return this.props.renderText(option);
        }

        return (<Text>{option}</Text>);
    }

    _renderRow(option, sectionID, rowID) {
        if(typeof this.props.renderRow === 'function') {
            return this.props.renderRow(option);
        }

        const disabled = this.state.disabled;
        return (

            <View style={this.props.optionStyle}>
                <TouchableOpacity
                    activeOpacity={disabled ? 1 : 0.7}
                    onPress={!disabled ? ()=>{this._selectOption(rowID)} : null}
                >
                    <View>
                        <View
                            style={Styles.row}
                        >
                            <View style={Styles.optionLabel}>{this._renderText(option)}</View>
                            <View style={Styles.optionIndicator}>{this._renderIndicator(option, rowID)}</View>
                        </View>
                    </View>
                </TouchableOpacity>
                {this._renderSeparator(option)}
            </View>
        );
    }

    render() {
        return (
            <ListView
                style={[Styles.list, this.props.style]}
                dataSource={this.state.dataSource}
                renderRow={this._renderRow}
                removeClippedSubviews={false}
            />
        );
    }
};

MultipleChoice.propTypes = propTypes;
MultipleChoice.defaultProps = defaultProps;

module.exports = MultipleChoice;
