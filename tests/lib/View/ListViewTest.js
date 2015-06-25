/* global describe,it */

var assert = require('chai').assert;

import Entity from '../../../lib/Entity/Entity';
import Field from '../../../lib/Field/Field';
import ReferenceField from '../../../lib/Field/ReferenceField';
import ReferenceManyField from '../../../lib/Field/ReferenceManyField';
import ListView from '../../../lib/View/ListView';

describe('ListView', function() {
    describe('getFilterReferences()', function() {
        it('should return only reference and reference_many fields', function() {
            var post = new Entity('post');
            var category = new ReferenceField('category');
            var tags = new ReferenceManyField('tags');
            var view = new ListView(post)
                .fields([
                    new Field('title'),
                    tags
                ])
                .filters([
                    category
                ]);

            assert.deepEqual({category: category}, view.getFilterReferences());
        });

        it('should return only filter reference with refresh delay if withRefreshDelay is true', function() {
            var post = new Entity('post');
            var category = new ReferenceField('category').refreshDelay(500);
            var tags = new ReferenceManyField('tags').refreshDelay(null);
            var view = new ListView(post)
                .fields([
                    new Field('title'),
                    tags
                ])
                .filters([
                    category
                ]);

            assert.deepEqual({category: category}, view.getFilterReferences(true));
        });

        it('should return only filter reference with no refresh delay if withRefreshDelay is false', function() {
            var post = new Entity('post');
            var category = new ReferenceField('category').refreshDelay(500);
            var tags = new ReferenceManyField('tags').refreshDelay(null);
            var view = new ListView(post)
                .fields([
                    new Field('title'),
                    tags
                ])
                .filters([
                    category
                ]);

            assert.deepEqual({ tags: tags }, view.getReferences(false));
        });
    });
});
