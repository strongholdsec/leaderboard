import { useCallback, useEffect, useMemo, useState } from 'react';
// import { shallowEqual } from 'react-redux'


import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from './state';
import { IAuditorResult, ICompetitionTop } from './reducer';
import { updateAuditorResults, updateCompetitionIds, updateCompetitionTops } from './actions';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

const useClient = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true)
  },[])

  return isClient;
}

export function useAuditorsResults(): [IAuditorResult[], (auditorResults: IAuditorResult[]) => void] {
  const dispatch = useAppDispatch();
  const auditorHistory = useAppSelector((state) => state.mainReducer.auditorResults);
  const setAuditorHistory = useCallback(
    (auditorResults: IAuditorResult[]) => {
      dispatch(updateAuditorResults({ auditorResults }));
    },
    [dispatch],
  );

  const isClient = useClient();

  return [isClient ? auditorHistory : [], setAuditorHistory];
}

export function useCompetitionIds(): [number[], (auditorResults: number[]) => void] {
    const dispatch = useAppDispatch();
    const competitionIds = useAppSelector((state) => state.mainReducer.competitionIds);
    const setCompetitionIds = useCallback(
      (competitionIds: number[]) => {
        dispatch(updateCompetitionIds({ competitionIds }));
      },
      [dispatch],
    );

    const isClient = useClient();

    return [isClient ? competitionIds : [], setCompetitionIds];
  }
  
  export function useCompetitionTops(): [ICompetitionTop[], (competitionTops: ICompetitionTop[]) => void] {
    const dispatch = useAppDispatch();
    const competitionTops = useAppSelector((state) => state.mainReducer.competitionTops);
    const setCompetitionTops = useCallback(
      (competitionTops: ICompetitionTop[]) => {
        dispatch(updateCompetitionTops({ competitionTops }));
      },
      [dispatch],
    );

    const isClient = useClient();

    return [isClient ? competitionTops : [], setCompetitionTops];
  }
  