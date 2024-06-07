export type NewTask = {
  tittle: string;
  description: string;
  date: string;
  startTime: Date | String | undefined;
  endTime: Date | String | undefined;
  frequency: string;
  isPriority: boolean;
};

export type TTask = {
  id: string;
  name: string;
  description: string;
  startDate: Date | string | moment.Moment | undefined;
  endDate: Date | string | moment.Moment | undefined;
  isPriority: boolean;
  isDone: boolean;
  hasFrequency: boolean;
  createdAt: Date;
  updatedAt: Date;
};
