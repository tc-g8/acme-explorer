import { Entity } from './entity.model';

export class Datawarehouse extends Entity {
  private _tripsManagedByManager!: [
    {
      averageTripsPerManager: number;
      minTripsPerManager: number;
      maxTripsPerManager: number;
      stdDevTripsPerManager: number;
    }
  ];
  private _applicationsPerTrip!: [
    {
      averageApplicationsPerTrip: number;
      minApplicationsPerTrip: number;
      maxApplicationsPerTrip: number;
      stdDevApplicationsPerTrip: number;
    }
  ];
  private _tripsPrice!: [
    {
      averagePrice: number;
      minPrice: number;
      maxPrice: number;
      stdDevPrice: number;
    }
  ];
  private _ratioApplicationsByStatus!: [
    {
      _id: string;
      applications: number;
    }
  ];
  private _averagePriceRange!: [
    {
      averageMinPrice: number;
      averageMaxPrice: number;
    }
  ];
  private _topSearchedKeywords!: [
    {
      _id: string;
      totalSearch: number;
    }
  ];
  private _computationMoment!: Date;

  constructor() {
    super();
  }

  public get tripsManagedByManager(): [
    {
      averageTripsPerManager: number;
      minTripsPerManager: number;
      maxTripsPerManager: number;
      stdDevTripsPerManager: number;
    }
  ] {
    return this._tripsManagedByManager;
  }
  public set tripsManagedByManager(
    value: [
      {
        averageTripsPerManager: number;
        minTripsPerManager: number;
        maxTripsPerManager: number;
        stdDevTripsPerManager: number;
      }
    ]
  ) {
    this._tripsManagedByManager = value;
  }

  public get applicationsPerTrip(): [
    {
      averageApplicationsPerTrip: number;
      minApplicationsPerTrip: number;
      maxApplicationsPerTrip: number;
      stdDevApplicationsPerTrip: number;
    }
  ] {
    return this._applicationsPerTrip;
  }
  public set applicationsPerTrip(
    value: [
      {
        averageApplicationsPerTrip: number;
        minApplicationsPerTrip: number;
        maxApplicationsPerTrip: number;
        stdDevApplicationsPerTrip: number;
      }
    ]
  ) {
    this._applicationsPerTrip = value;
  }

  public get tripsPrice(): [
    {
      averagePrice: number;
      minPrice: number;
      maxPrice: number;
      stdDevPrice: number;
    }
  ] {
    return this._tripsPrice;
  }
  public set tripsPrice(
    value: [
      {
        averagePrice: number;
        minPrice: number;
        maxPrice: number;
        stdDevPrice: number;
      }
    ]
  ) {
    this._tripsPrice = value;
  }

  public get ratioApplicationsByStatus(): [
    {
      _id: string;
      applications: number;
    }
  ] {
    return this._ratioApplicationsByStatus;
  }
  public set ratioApplicationsByStatus(
    value: [
      {
        _id: string;
        applications: number;
      }
    ]
  ) {
    this._ratioApplicationsByStatus = value;
  }

  public get averagePriceRange(): [
    {
      averageMinPrice: number;
      averageMaxPrice: number;
    }
  ] {
    return this._averagePriceRange;
  }
  public set averagePriceRange(
    value: [
      {
        averageMinPrice: number;
        averageMaxPrice: number;
      }
    ]
  ) {
    this._averagePriceRange = value;
  }

  public get topSearchedKeywords(): [
    {
      _id: string;
      totalSearch: number;
    }
  ] {
    return this._topSearchedKeywords;
  }
  public set topSearchedKeywords(
    value: [
      {
        _id: string;
        totalSearch: number;
      }
    ]
  ) {
    this._topSearchedKeywords = value;
  }

  public get computationMoment(): Date {
    return this._computationMoment;
  }
  public set computationMoment(value: Date) {
    this._computationMoment = value;
  }
}
