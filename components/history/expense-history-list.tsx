import { TransactionHistoryList } from '@/types/expense/expense';
import { getFormattedDate, getFormattedPrice } from '@/utils';
import { CategoryIcons } from '@/utils/icons';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useCallback, useRef } from 'react';
import { FlatList, ListRenderItem, Text, View } from 'react-native';
import Loader from '../loader/loader';

type Props = {
  expenseHistoryList: TransactionHistoryList[];
  onEndReached: () => void;
  isInitialDataLoading: boolean;
  isFetchingMoreData: boolean;
  isEndReached: boolean;
};

const ITEM_HEIGHT = 72;

const ExpenseHistoryList = ({
  expenseHistoryList,
  onEndReached,
  isInitialDataLoading,
  isFetchingMoreData,
  isEndReached
}: Props) => {
  const onEndReachedCalledDuringMomentum = useRef(false);

  const keyExtractor = useCallback(
    (item: TransactionHistoryList) => String(item.id),
    []
  );

  const handleEndReached = () => {
    if (!onEndReachedCalledDuringMomentum.current) {
      onEndReached();
      onEndReachedCalledDuringMomentum.current = true;
    }
  };

  const renderItem: ListRenderItem<TransactionHistoryList> = useCallback(
    ({ item }) => (
      <View
        className="my-2 flex flex-row items-center justify-between gap-6 p-3"
        style={{ height: ITEM_HEIGHT }}
      >
        <View className="rounded-full bg-primary/20 p-3">
          <MaterialIcons
            name={CategoryIcons[item.categoryName].iconName}
            size={24}
            color="#30e86e"
          />
        </View>
        <View className="flex flex-grow">
          <Text className="font-inter-medium text-base">
            {getFormattedPrice(item.amount)}
          </Text>
          <Text className="font-inter text-base text-text-light">
            {item.categoryName}
          </Text>
          <Text className="font-inter text-base text-text-light">
            {item.description}
          </Text>
        </View>
        <View className="items-end justify-center gap-2">
          <Text className="text-text-light">{getFormattedDate(item.date)}</Text>
          <Text className="text-base text-text-light">
            Bal: {getFormattedPrice(item.balanceAmount)}
          </Text>
        </View>
      </View>
    ),
    []
  );

  if (isInitialDataLoading && expenseHistoryList.length === 0) {
    return <Loader />;
  }

  return (
    <View className="mt-8 flex-1">
      <FlatList
        data={expenseHistoryList}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={7}
        removeClippedSubviews={true}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index
        })}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.2}
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum.current = false;
        }}
        ListFooterComponent={() => (
          <>
            {isFetchingMoreData ? (
              <View className="py-3">
                <Loader />
              </View>
            ) : isEndReached && expenseHistoryList.length !== 0 ? (
              <View className="mt-4 py-4">
                <Text className="text-center text-text-light">
                  You have reached the end
                </Text>
              </View>
            ) : null}
          </>
        )}
        ListEmptyComponent={() =>
          !isInitialDataLoading && (
            <View className="py-8">
              <Text className="text-center text-text-light">
                Nothing to show.
              </Text>
            </View>
          )
        }
      />
    </View>
  );
};

export default ExpenseHistoryList;
