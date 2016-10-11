import React, { Component, PropTypes } from 'react'
import {View, Text, ListView} from 'react-native'
import AddByAddressBook from './AddByAddressBook'
import FriendRow, {seperatorFriends} from './FriendRow'
import {filter} from 'lodash'

class AddByAddressBookContainer extends Component {

    constructor (props) {
        super(props)

        this.state = {
            friendsDataSource: friendsDataSource.cloneWithRows([]),
            friends: friends,
            searchText: "",
            rawData: sortedFriends
        }

        this.selectFriend = this.selectFriend.bind(this)
        this.backButtonPressed = this.backButtonPressed.bind(this)
        this.setSearchText = this.setSearchText.bind(this)
    }

    componentDidMount () {
        mockAPICall((err, res) => {
            if (err) console.log(err)
            else {
                this.setState({
                    friendsDataSource: friendsDataSource.cloneWithRows(res)
                })
            }
        })
    }

    backButtonPressed () {
        this.props.navigator.pop()
    }

    setSearchText(event) {
        let searchText = event.nativeEvent.text;
        this.setState({searchText});

        let filteredData = this.filterFriends(searchText, this.state.rawData);
        this.setState({
            friendsDataSource: friendsDataSource.cloneWithRows(filteredData)
        });
    }

    filterFriends(searchText, friends) {
        let text = searchText.toLowerCase();

        return filter(friends, (f) => {
            let friend = f.name.toLowerCase();
            return friend.search(text) !== -1;
        });
    }

    // Will be called when the friend is clicked. Need to display change to display individual user popup
    selectFriend (rowId) {
        var newFriends = []
        newFriends = this.state.friends.slice()
        newFriends[rowId] = {
            name: newFriends[rowId].name,
            highLighted: !newFriends[rowId].highLighted
        }
        console.log(this.state.friends)
        this.setState({
            friends: newFriends,
            friendsDataSource: this.state.friendsDataSource.cloneWithRows(newFriends)
        })
    }

    render () {
        return (
            <AddByAddressBook
                backButtonPressed={this.backButtonPressed}
                friends={this.state.friendsDataSource}
                onSelectFriend={this.selectFriend}
                renderMyFriendsRow={FriendRow}
                seperatorFriends={seperatorFriends}
                setSearchText={this.setSearchText}
            />
        )
    }

}

export default AddByAddressBookContainer

// Will change to retrieve firebase info when we discover how
const mockAPICall = (cb) => {
    setTimeout(() => cb(null, sortedFriends), 300)
}

var friendsDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

// Mock Data
const friends = [
    {
        name: 'Lachlan Dee',
        highLighted: false
    },
    {
        name: 'Adam Villela',
        highLighted: false
    },
    {
        name: 'Ben Paul',
        highLighted: false
    },
    {
        name: 'Brody Ricardi',
        highLighted: false
    },
    {
        name: 'Claire Gorinas',
        highLighted: false
    },
    {
        name: 'Emily Thompson',
        highLighted: false
    },
    {
        name: 'Josh Grover',
        highLighted: false
    },
    {
        name: 'Jack Crisp',
        highLighted: false
    },
    {
        name: 'Harry Mitchell',
        highLighted: false
    },
    {
        name: 'Luke Wentworth',
        highLighted: false
    },
    {
        name: 'Tom Deery',
        highLighted: false
    },
    {
        name: 'Kane Michelini',
        highLighted: false
    },
    {
        name: 'Georgia Castricum',
        highLighted: false
    },
    {
        name: 'Jake Musson',
        highLighted: false
    },
    {
        name: 'nathan',
        highLighted: false
    },
    {
        name: 'Anthony LaSpina',
        highLighted: false
    },
    {
        name: 'tim',
        highLighted: false
    },
    {
        name: 'remdogga',
        highLighted: false
    },
    {
        name: 'Nick Howell',
        highLighted: false
    },
    {
        name: 'Henry Mahoney',
        highLighted: false
    },
    {
        name: 'Talia Rinaldo',
        highLighted: false
    },
    {
        name: 'Michael Wilson',
        highLighted: false
    },
    {
        name: 'Lochie Brick',
        highLighted: false
    },
    {
        name: 'Rebecca Kirk',
        highLighted: false
    }
]

var sortedFriends = friends.sort((a,b) => {
    return a.name.localeCompare(b.name);
})

