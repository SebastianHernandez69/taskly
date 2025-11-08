import React from 'react';
import { getListsWithStats } from '@/lib/server/actions/lists';
import { getColors } from '@/lib/server/actions/colors';
import { ListSectionClient } from './ListSectionClient';

export const ListSection = async () => {
  const [lists, colors] = await Promise.all([
    getListsWithStats(),
    getColors()
  ]);

  console.log("Colors fetched in ListSection:", colors);

  return <ListSectionClient initialLists={lists} />;

};
