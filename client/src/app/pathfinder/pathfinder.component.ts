import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AnalyticsService } from 'src/app/shared/services/analytics.service';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { AnalyticsPathTreeData } from 'src/app/shared/interfaces';
import sigma from 'sigma';

// declare const sigma: any;

@Component({
  selector: 'app-pathfinder',
  templateUrl: './pathfinder.component.html',
  styleUrls: ['./pathfinder.component.css']
})
export class PathfinderComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild("Tree", { static: true }) Tree: ElementRef;

  aSub$: Subscription;
  private sigma: any;
  graph = {
    "nodes": [
        {
            "id": "n0",
            "label": "(entrance)",
            "x": 3,
            "y": 10,
            "size": 100,
            "labelSize": "fixed"
        },
        {
            "id": "n1",
            "label": "(not set)(/)",
            "x": 1,
            "y": 5,
            "size": 100,
            "labelSize": "fixed"
        },
        {
            "id": "n2",
            "label": "Page 1(/page1)",
            "x": 28,
            "y": 3,
            "size": 100,
            "labelSize": "fixed"
        },
        {
            "id": "n3",
            "label": "Page 2(/page2)",
            "x": 5,
            "y": 7,
            "size": 100,
            "labelSize": "fixed"
        },
        {
            "id": "n4",
            "label": "Page 3(/page3)",
            "x": 17,
            "y": 13,
            "size": 100,
            "labelSize": "fixed"
        },
        {
            "id": "n5",
            "label": "Success(/registration-success?email=darthrevan1333@gmail.com&psw=фыв&psw-repeat=фыв&remember=on)",
            "x": 13,
            "y": 0,
            "size": 100,
            "labelSize": "fixed"
        },
        {
            "id": "n6",
            "label": "Success(/registration-success?email=darthrevan1333@gmail.com&psw=фывап&psw-repeat=фыавыфаыв&remember=on)",
            "x": 10,
            "y": 9,
            "size": 100,
            "labelSize": "fixed"
        },
        {
            "id": "n7",
            "label": "Success(/registration-success?email=darthrevan1333@gmail.com&psw=asd&psw-repeat=Varmilo+Vintage+Days+VA87M&remember=on)",
            "x": 12,
            "y": 4,
            "size": 100,
            "labelSize": "fixed"
        }
    ],
    "edges": [
        {
            "id": "e0",
            "source": "n0",
            "target": "n1",
            "type": "arrow"
        },
        {
            "id": "e1",
            "source": "n1",
            "target": "n1",
            "type": "arrow"
        },
        {
            "id": "e2",
            "source": "n1",
            "target": "n2",
            "type": "arrow"
        },
        {
            "id": "e3",
            "source": "n1",
            "target": "n3",
            "type": "arrow"
        },
        {
            "id": "e4",
            "source": "n1",
            "target": "n4",
            "type": "arrow"
        },
        {
            "id": "e5",
            "source": "n1",
            "target": "n5",
            "type": "arrow"
        },
        {
            "id": "e6",
            "source": "n1",
            "target": "n6",
            "type": "arrow"
        },
        {
            "id": "e7",
            "source": "n1",
            "target": "n7",
            "type": "arrow"
        },
        {
            "id": "e8",
            "source": "n2",
            "target": "n1",
            "type": "arrow"
        },
        {
            "id": "e9",
            "source": "n2",
            "target": "n2",
            "type": "arrow"
        },
        {
            "id": "e10",
            "source": "n2",
            "target": "n3",
            "type": "arrow"
        },
        {
            "id": "e11",
            "source": "n2",
            "target": "n4",
            "type": "arrow"
        },
        {
            "id": "e12",
            "source": "n3",
            "target": "n1",
            "type": "arrow"
        },
        {
            "id": "e13",
            "source": "n3",
            "target": "n3",
            "type": "arrow"
        },
        {
            "id": "e14",
            "source": "n3",
            "target": "n4",
            "type": "arrow"
        },
        {
            "id": "e15",
            "source": "n4",
            "target": "n1",
            "type": "arrow"
        },
        {
            "id": "e16",
            "source": "n4",
            "target": "n2",
            "type": "arrow"
        },
        {
            "id": "e17",
            "source": "n4",
            "target": "n4",
            "type": "arrow"
        },
        {
            "id": "e18",
            "source": "n5",
            "target": "n1",
            "type": "arrow"
        },
        {
            "id": "e19",
            "source": "n6",
            "target": "n1",
            "type": "arrow"
        },
        {
            "id": "e20",
            "source": "n7",
            "target": "n1",
            "type": "arrow"
        },
        {
            "id": "e21",
            "source": "n7",
            "target": "n7",
            "type": "arrow"
        }
    ]
};
  pending = true;

  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.aSub$) {
      this.aSub$.unsubscribe();
    }
  }

  ngAfterViewInit() {
    this.graphCreator();
  }

  graphCreator() {
    this.aSub$ = this.analyticsService.getPathTreeData().subscribe(
      (data: AnalyticsPathTreeData) => {
        // this.graph = data;

        this.pending = false;

        this.sigma = new sigma(
          {
             renderer: {
               container: this.Tree.nativeElement,
               type: 'canvas',
             },
             settings: {
              edgeColor: 'default',
              defaultNodeColor: 'rgba(224, 65, 65, 0.9)',
              defaultEdgeColor: '#4fc3f7',
              // '#dbc09b',
              font: "calibri",
              labelSize: "proportional",
              boderSize: 1,
              sideMargin: 20,
              zoomMax: 1,
              minArrowSize: 10,
             }
           }
         );
    
        this.sigma.graph.read(this.graph);
        this.sigma.cameras[0].goTo({ x: 0, y: 0, angle: 0, ratio: 0.2 });
        this.sigma.refresh();
      },
      err => {
        console.warn(err);
        MaterialService.toast(err.error.message);
      }
    )
  }

}
