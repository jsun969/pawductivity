import { FontAwesome5 } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

export const TabBarIcon = (props: {
  name: React.ComponentProps<typeof FontAwesome5>['name'];
  color: string;
}) => {
  return <FontAwesome5 size={22} style={styles.tabBarIcon} solid {...props} />;
};

export const styles = StyleSheet.create({
  tabBarIcon: {
    marginBottom: -1,
  },
});
