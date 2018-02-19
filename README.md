
# react-native-multiple-choice
A cross-platform (iOS / Android) single and multiple-choice React Native component.

## Notice: Forked version with the following changes
- prop-types has been separated out to its own component.  This is for compatibility with React Native 0.44 and above
- The answers are indexed using a rowID instead of their text value.

## Install

```sh
npm i react-native-multiple-choice --save
```

## Usage

Here is an overview of the component usage.

```jsx
<MultipleChoice
    options={[
    'Lorem ipsum dolor sit',
    'Lorem ipsum',
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
    'Lorem ipsum dolor sit amet, consetetur',
    'Lorem ipsum dolor'
    ]}
    selectedOptions={[1]}
    maxSelectedOptions={2}
    onSelection={(rowID)=>alert(rowID + ' was selected!')}
/>
```

## Props

* `style - {}` custom style of the list
* `optionStyle - {}` custom style of the option element
* `options - []` required array of options
* `selectedOptions - []` optional array of initially selected options by rowID
* `maxSelectedOptions - int` optional maximum number of selectable options
* `onSelection - function(option){}` option selection callback
* `renderIndicator - function(option)` should return a selected/deselected indicator node, default: check mark image
* `renderSeparator - function(option)` should return a separator node that is displayed between the options, default: gray line
* `renderText - function(option)` should return a text node, default: text node
* `renderRow - function(option)` should return a option view
* `disabled - bool` if set to true component is disabled and can't be interacted with

## Screenshot

![example](https://raw.githubusercontent.com/d-a-n/react-native-multiple-choice/master/assets/images/screenshot.png)


