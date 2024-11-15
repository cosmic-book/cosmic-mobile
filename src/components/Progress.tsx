import { useEffect, useRef } from 'react';
import { Animated, View as RnView, type View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { cn } from '../lib/utils';

function Progress({
  className,
  colors = ['#0e6de7', '#512A83', '#C90B94'],
  value,
  ...props
}: { className?: string; value: number; colors?: [string, string, ...string[]] } & React.ComponentPropsWithoutRef<
  typeof View
>) {
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: value,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [widthAnim, value]);

  return (
    <RnView
      className={cn(
        'h-2 w-full overflow-hidden rounded-full bg-secondary',
        className
      )}
    >
      <Animated.View
        style={{
          width: widthAnim.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', '100%'],
          }),
          height: '100%',
        }}
      >
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1, borderRadius: 999 }}
        />
      </Animated.View>
    </RnView>
  );
}

export { Progress };
