export function findParentIds(data: any, targetId: any, parentIds = [] as any) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === targetId) {
      if (data[i].parentId) {
        parentIds.push(data[i].parentId);
        findParentIds(data, data[i].parentId, parentIds);
      }
    } else if (data[i].children) {
      findParentIds(data[i].children, targetId, parentIds);
    }
  }

  return parentIds;
}
