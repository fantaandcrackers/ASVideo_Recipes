/**
{
picture: "https://scontent.xx.fbcdn.net/hvthumb-xtf1/v/t15.0-10/p160x160/12496850_1727902004129108_213464712_n.jpg?oh=d64f78bcdc9f3e3b7f5526ba0c4eea7e&oe=57515655",
embed_html: "<iframe src="https://www.facebook.com/video/embed?video_id=1727880490797926" width="1080" height="1080" frameborder="0"></iframe>",
created_time: "2016-03-16T23:36:13+0000",
description: "Loaded BBQ Chicken Nachos FULL RECIPE: http://bzfd.it/21vTnlW",
id: "1727880490797926"
},
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  TextInput,
  StyleSheet,
  ListView,
  Image,
  Text,
  View
} from 'react-native';

var pageid = 'buzzfeedtasty';
var REQUEST_URL = 'https://graph.facebook.com/v2.5/'+pageid+'?fields=videos.limit(1000){picture,embed_html,created_time,description}&access_token=CAACEdEose0cBAL0ohB0TAIaclZBxd8YXA1Xpq57WZCgFgRjT9P4WZAJDjpkHrcsb8tLO2uKEo9vwvpnbFfWHHbDTd8OWjjUWBkYJqepbh7taoP9RfQdZALTpcZBnm22djUZCdYkZAoIOTz6HE1MudYJjSkoueckl69NQdMS2i3nKN5CdebBMsRV34ypUPMUgKJ0OykL5v8cAqnGT4Cg14B3'

var sanitizeTastyDescription=function(description){
 if(description.search("FULL")!=-1)
   return description.substr(0,description.search("FULL"));
 return description;
}
var sanitizeCreatedTime=function(time){
 var msDifference = new Date() - new Date(time)
 return Math.round(msDifference/(1000*3600))+' hrs'
}


class AwesomeProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.videos.data),
          loaded: true,
        });
      })
      .done();
  }
  renderLoadingView() {
      return (
        <View style={styles.container}>
          <Text>
            Loading recipes...
          </Text>
        </View>
      );
    }
    render() {
       if (!this.state.loaded) {
         return this.renderLoadingView();
       }

       return (
        <View>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}

        />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRecipe}
          style={styles.listView}
          placeholder={"search"}
        />


         </View>
       );
     }
     renderRecipe(recipe) {
        var title;
        var timeAgo;

        title = sanitizeTastyDescription(recipe.description);
        timeAgo = sanitizeCreatedTime(recipe.created_time);

        var msDifference = new Date() - new Date(recipe.created_time)
        timeAgo= Math.round(msDifference/(1000*3600))+' hrs ago'

       return (
         <View style={styles.container}>
           <Image
             source={{uri: recipe.picture}}
             style={styles.thumbnail}
           />
           <View style={styles.rightContainer}>
             <Text style={styles.title}>{title}</Text>
             <Text style={styles.timeAgo}>{timeAgo}</Text>
           </View>
         </View>
       );
     }
} //end class

var styles = StyleSheet.create({
  listView: {
      paddingTop: 20,
      backgroundColor: '#F5FCFF',
    },
  container: {
     flex: 1,
     flexDirection: 'row',
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: '#F5FCFF',
   },
   rightContainer: {
     flex: 1,
   },
  thumbnail: {
    width: 80,
    height: 81,
  },
  title: {
      fontSize: 20,
      marginLeft: 30,
      textAlign: 'left',
    },
  timeAgo: {
    textAlign: 'left'
  }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
