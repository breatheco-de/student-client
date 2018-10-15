# BreatheCode Platform JS Components

This is the main UI Library used in all BreatheCode interfaces based on react.
> Note: This is a very early development library, please help us debug it.

## Philosophy

The BreatheCode UX is based on Markdown, it mainly relys on typography to create
a neat experience but with a very minimalis approach.

## Instalation

1. Install using npm
```
$ npm i @breathecode/breathecode-react-components --save
```
2. Import any component that you want to use
```
import { Panel, DropLink } from '@breathecode/breathecode-react-components';
```

## Component Table of Contents:

| Component     | Description                                                                               |
|---------------|-------------------------------------------------------------------------------------------|
| Button        |Simple button                                                                              | 
| Checkbox      |It's a very simple checkbot                                                                | 
| Droplink      |It's a minimalist bootstrap dropdown                                                       | 
| List          |Just a list of stuff                                                                       | 
| Loading       |Loading animation                                                                          | 
| MenuItem      |Item on the left sidebar                                                                   | 
| Modal         |Show stuff in the center of the screen                                                     | 
| Notifier      |Notifications in the top of the viewport                                                   | 
| Panel         |To display a box with material design shadow level                                         | 
| PrivateRoute  |React Route that requiers autentication to display                                         | 
| ProgressKPI   |Small indicator of progress                                                                | 
| Sidebar       |The Main Navegation component in BreatheCode's UI                                          | 
| BreatheCrumb  |Show the path were the user is standing and allos the user to go back to previous levels   | 

### Actionable

A label that has a check on the right depending if its done or not.

| Demo | ![alt text](https://breatheco-de.github.io/react-components/img/actionable.png "Logo Title Text 1") |
|---|----|

Properties
```js
{
  label: PropTypes.string.isRequired,
  dropdown: PropTypes.array,
  isSelected: PropTypes.bool,
  onDropdownSelect: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['lesson', 'replit', 'quiz', 'assignment']),
}
```

```html
    <ActionableItem key={i} type={l.type} 
        done={(l.status === "done")} 
        label={(typeof l.title !== 'undefined') ? l.title : l.associated_slug} 
        dropdown={l.menu} 
        onDropdownSelect={(option)=>this.actionableSelected(l,option)} 
      />;
```

### Checkbox

| Demo | ![alt text](https://breatheco-de.github.io/react-components/img/checkbox.png "Logo Title Text 1") |
|---|----|

### Droplink

It displays a list of options when you click on it

| Demo | ![alt text](https://breatheco-de.github.io/react-components/img/droplink.png "Logo Title Text 1") |
|---|----|
=======

**Usage**
```html
        <DropLink
            className='list_card' 
            dropdown={[
                { label: 'review students', slug: 'cohort_students', to: `/manage/student/?cohort=${data.slug}`},
                { label: 'change cohort stage', slug: 'change_stage', data: someData }
            ])}
            onSelect={(opt) => onEntitySelect(opt)}
        >
        Click me
        </DropLink>
```

### List

It displays a ul with LIs or OLs depending on if it is ordered or not.

| Demo | ![alt text](https://breatheco-de.github.io/react-components/img/list.png "Logo Title Text 1") |
|---|----|

```html
    <List className="any-class" ordered={true}>
        <ActionableItem key={i} label="Make the bed" done={false} />
        <ActionableItem key={i} label="Make the bed" done={false} />
        <ActionableItem key={i} label="Make the bed" done={false} />
        <ActionableItem key={i} label="Make the bed" done={false} />
    </List>
```
### Loading
Show or hides a loadbar on the center of the screen

| Demo | ![alt text](https://breatheco-de.github.io/react-components/img/loading.png "Logo Title Text 1") |
|---|----|

```html
    <Loading show={true} />
```
### Modal

| Demo | ![alt text](https://breatheco-de.github.io/react-components/img/modal.png "Logo Title Text 1") |
|---|----|

### Notifier
Displays a notification message on the top of the screen, you can specify if you want your
notification to prompt the user for confirmation or not.

| Demo | ![alt text](https://breatheco-de.github.io/react-components/img/notifier.png "Logo Title Text 1") |
|---|----|

```js
    let notifications = [{
        id: 1, //unique identifier
        msg: 'Are you sure you want to delete?', //message to display
        type: 'info', //info, error, success or warning
        onConfirm: confirm //this callback will be called on user confirmation 
    }];
```
```html
    <Notifier notifications={notifications} />
```
### PrivateRoute

It behaves like a normal react-router Route but with the addition 
that it redirects the user to /login if it loggedIn = false

```html
    <BrowserRouter>
            <Switch>
                <Route exact path='/login' component={LoginView} />
                <PrivateRoute exact path='/' loggedIn={this.state.loggedIn} component={AnyPrivateView} />
                <Route render={() => (<p className="text-center mt-5">Not found</p>)} />
            </Switch>
        </div>
    </BrowserRouter>
```
### ProgressKPI
Displays the percentage of progress from 0 to 100%

| Demo | ![alt text](https://breatheco-de.github.io/react-components/img/progress_kpi.png "Logo Title Text 1") |
|---|----|

```html
    <ProgressKPI progress={76} />
```
### Sidebar

| Demo | ![alt text](https://breatheco-de.github.io/react-components/img/sidebar.png "Logo Title Text 1") |
|---|----|
### BreatheCrumb

| Demo | ![alt text](https://breatheco-de.github.io/react-components/img/breadcrumb.png "Logo Title Text 1") |
|---|----|

